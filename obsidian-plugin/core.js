/* Clean Copy for Obsidian — core logic (UMD, no deps).
 * Reuses the same cleaning/HTML→Markdown pipeline as Clean Copy
 * (Chrome/Firefox/web) so all surfaces behave identically.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CleanCopyCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {

const CLEAN_RULES = [
  { pattern: /[\u201C\u201D]/g, replacement: '"' },
  { pattern: /[\u2018\u2019]/g, replacement: "'" },
  { pattern: /\u2014/g, replacement: ' -- ' },
  { pattern: /\u2013/g, replacement: ' - ' },
  { pattern: /[\u200B\u200C\u200D\uFEFF]/g, replacement: '' },
  { pattern: /\u00A0/g, replacement: ' ' },
  { pattern: /([^\n \t])[ \t]{2,}/g, replacement: '$1 ' },
  { pattern: /\n{3,}/g, replacement: '\n\n' },
];

function cleanText(text) {
  let cleaned = text;
  for (const rule of CLEAN_RULES) {
    cleaned = cleaned.replace(rule.pattern, rule.replacement);
  }
  return cleaned.trim();
}

function htmlToMarkdown(html) {
  let md = html;

  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

  md = md.replace(/<(?:b|strong)[^>]*>(.*?)<\/(?:b|strong)>/gi, '**$1**');
  md = md.replace(/<(?:i|em)[^>]*>(.*?)<\/(?:i|em)>/gi, '*$1*');
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');

  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, (_, code) => {
    code = code.replace(/<code[^>]*>/gi, '').replace(/<\/code>/gi, '');
    code = code.replace(/<br\s*\/?>/gi, '\n');
    code = code.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/>/g, '>');
    return '```\n' + code.trim() + '\n```\n\n';
  });

  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

  const convertList = (_, openTag, body) => {
    const ordered = /^<ol/i.test(openTag);
    let idx = 0;
    const items = [];
    const re = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let m;
    while ((m = re.exec(body)) !== null) {
      idx += 1;
      const marker = ordered ? `${idx}. ` : '- ';
      const inner = m[1].replace(/^\s+/, '').replace(/\s+$/, '')
        .replace(/\n([ \t]*)- /g, (all, ws) => '\n  ' + ws + '- ')
        .replace(/\n([ \t]*)(\d+)\. /g, (all, ws, n) => '\n  ' + ws + n + '. ');
      items.push(marker + inner);
    }
    return '\n' + items.join('\n') + '\n';
  };
  let prev;
  do {
    prev = md;
    md = md.replace(/(<(?:ul|ol)[^>]*>)((?:(?!<\/?(?:ul|ol)[^>]*>)[\s\S])*)<\/(?:ul|ol)>/gi, convertList);
  } while (md !== prev);

  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<hr\s*\/?>/gi, '---\n\n');

  md = md.replace(/<[^>]*>/g, '');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");

  md = md.replace(/\n{4,}/g, '\n\n');
  md = md.replace(/([^\n \t])[ ]{2,}/g, '$1 ');

  return cleanText(md);
}

/* Pro: custom cleanup rules — same contract as Clean Copy Pro. */
function compileRules(rules) {
  if (!Array.isArray(rules)) return [];
  return rules.map(function (r, i) {
    var flags = r.caseSensitive === false ? 'gi' : 'g';
    try {
      var re = r.regex ? new RegExp(r.find, flags)
        : new RegExp(r.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      return { re: re, replace: String(r.replace == null ? '' : r.replace) };
    } catch (e) {
      var err = new Error('Rule ' + (i + 1) + ': invalid pattern "' + r.find + '"');
      err.name = 'RuleError';
      throw err;
    }
  });
}

function applyRules(text, compiled) {
  var out = text;
  for (var i = 0; i < compiled.length; i++) {
    out = out.replace(compiled[i].re, compiled[i].replace);
  }
  return cleanText(out);
}

function batchConvert(snippets, mode, extraRules) {
  var compiled = [];
  try {
    compiled = compileRules(extraRules || []);
  } catch (e) {
    return snippets.map(function () { return { ok: false, error: e.message }; });
  }
  return (snippets || []).map(function (s) {
    try {
      var html = s && s.html != null ? s.html : String(s == null ? '' : s);
      var content = mode === 'markdown' ? htmlToMarkdown(html) : cleanText(html.replace(/<[^>]*>/g, ''));
      content = applyRules(content, compiled);
      return { ok: true, content: content };
    } catch (err) {
      return { ok: false, error: err.message || 'Conversion failed' };
    }
  });
}

return { cleanText, htmlToMarkdown, compileRules, applyRules, batchConvert };
});
