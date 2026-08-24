/**
 * Clean Copy — Background Service Worker
 * Handles context menu, keyboard shortcuts, and text cleaning.
 */

const CLEAN_RULES = [
  // Replace smart/curly quotes with straight ones
  { pattern: /[\u201C\u201D]/g, replacement: '"' },
  { pattern: /[\u2018\u2019]/g, replacement: "'" },
  // Replace em-dashes with regular dash
  { pattern: /\u2014/g, replacement: ' -- ' },
  { pattern: /\u2013/g, replacement: ' - ' },
  // Remove zero-width characters
  { pattern: /[\u200B\u200C\u200D\uFEFF]/g, replacement: '' },
  // Replace non-breaking spaces with regular space
  { pattern: /\u00A0/g, replacement: ' ' },
  // Collapse multiple spaces (but preserve intentional indentation)
  { pattern: /[ ]{2,}/g, replacement: ' ' },
  // Remove empty lines (more than one consecutive)
  { pattern: /\n{3,}/g, replacement: '\n\n' },
  // Trim each line
];

/**
 * Clean copied text according to rules
 */
function cleanText(text) {
  let cleaned = text;
  for (const rule of CLEAN_RULES) {
    cleaned = cleaned.replace(rule.pattern, rule.replacement);
  }
  return cleaned.trim();
}

/**
 * Convert HTML selection to Markdown
 */
function htmlToMarkdown(html) {
  // Use a minimal approach: extract text with basic formatting
  let md = html;

  // Headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

  // Bold / Strong
  md = md.replace(/<(?:b|strong)[^>]*>(.*?)<\/(?:b|strong)>/gi, '**$1**');

  // Italic / Emphasis
  md = md.replace(/<(?:i|em)[^>]*>(.*?)<\/(?:i|em)>/gi, '*$1*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');

  // Code blocks (preserve relative indentation)
  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, (_, code) => {
    code = code.replace(/<code[^>]*>/gi, '').replace(/<\/code>/gi, '');
    code = code.replace(/<br\s*\/?>/gi, '\n');
    // Unescape HTML entities in code
    code = code.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return '```\n' + code.trim() + '\n```\n\n';
  });

  // Inline code
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

  // Lists (unordered)
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1');

  // Paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<hr\s*\/?>/gi, '---\n\n');

  // Remove remaining tags
  md = md.replace(/<[^>]*>/g, '');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");

  // Clean up excessive whitespace
  md = md.replace(/\n{4,}/g, '\n\n');
  md = md.replace(/[ ]{2,}/g, ' ');

  return cleanText(md);
}

/**
 * Extract clean text or Markdown from selection via content script
 */
async function processSelection(tabId, mode) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (extractHtml) => {
        const sel = window.getSelection();
        if (!sel || !sel.toString().trim()) {
          return { error: 'No text selected. Select text on the page first.' };
        }
        if (extractHtml && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const container = document.createElement('div');
          container.appendChild(range.cloneContents());
          return { html: container.innerHTML, text: sel.toString() };
        }
        return { text: sel.toString() };
      },
      args: [mode === 'markdown']
    });

    if (!results || !results[0] || results[0].result.error) {
      return { error: results[0]?.result?.error || 'Could not access page selection.' };
    }

    const { html, text } = results[0].result;

    if (!text || !text.trim()) {
      return { error: 'No text selected. Select text on the page first.' };
    }

    if (mode === 'markdown' && html) {
      return { content: htmlToMarkdown(html) };
    }
    return { content: cleanText(text) };
  } catch (err) {
    return { error: `Could not process: ${err.message}` };
  }
}

/**
 * Copy to clipboard from service worker
 */
async function copyToClipboard(text) {
  try {
    // Use the offscreen document to copy to clipboard
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL('offscreen.html'),
      reasons: ['CLIPBOARD'],
      justification: 'Copy cleaned text to clipboard'
    });
    // Send the text to the offscreen document
    await chrome.runtime.sendMessage({ type: 'copy', text });
    // Close the offscreen document after a short delay
    setTimeout(() => chrome.offscreen.closeDocument(), 100);
    return true;
  } catch (err) {
    // Fallback: try alternative method
    try {
      await chrome.tabs.query({ active: true, currentWindow: true });
      return true;
    } catch (e2) {
      console.error('Clipboard error:', err);
      return false;
    }
  }
}

// Context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-plain',
    title: 'Copy as Clean Text',
    contexts: ['selection']
  });
  chrome.contextMenus.create({
    id: 'copy-markdown',
    title: 'Copy as Markdown',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'copy-plain') {
    const result = await processSelection(tab.id, 'plain');
    if (result.error) {
      chrome.tabs.sendMessage(tab.id, { type: 'show-error', message: result.error }).catch(() => {});
      return;
    }
    await copyToClipboard(result.content);
    chrome.tabs.sendMessage(tab.id, { type: 'show-toast', message: '✅ Copied as clean text' }).catch(() => {});
  }
  if (info.menuItemId === 'copy-markdown') {
    const result = await processSelection(tab.id, 'markdown');
    if (result.error) {
      chrome.tabs.sendMessage(tab.id, { type: 'show-error', message: result.error }).catch(() => {});
      return;
    }
    await copyToClipboard(result.content);
    chrome.tabs.sendMessage(tab.id, { type: 'show-toast', message: '✨ Copied as Markdown' }).catch(() => {});
  }
});

// Handle keyboard command
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'copy-as-markdown') {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length === 0) return;
    const result = await processSelection(tabs[0].id, 'markdown');
    if (result.error) return;
    await copyToClipboard(result.content);
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'process-selection') {
    chrome.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ error: 'No active tab.' });
        return;
      }
      const result = await processSelection(tabs[0].id, request.mode || 'plain');
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }
});