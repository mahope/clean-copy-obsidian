/**
 * Clean Copy — Popup UI
 */
let selectedMode = 'plain';

document.addEventListener('DOMContentLoaded', () => {
  const modePlain = document.getElementById('mode-plain');
  const modeMarkdown = document.getElementById('mode-markdown');
  const copyBtn = document.getElementById('copy-btn');
  const statusDiv = document.getElementById('status');
  const proLink = document.getElementById('pro-link');

  // Load saved preference
  chrome.storage.local.get(['copyMode'], (data) => {
    if (data.copyMode === 'markdown') {
      selectMode('markdown');
    } else {
      selectMode('plain');
    }
  });

  function selectMode(mode) {
    selectedMode = mode;
    modePlain.classList.toggle('active', mode === 'plain');
    modeMarkdown.classList.toggle('active', mode === 'markdown');
    chrome.storage.local.set({ copyMode: mode });
  }

  modePlain.addEventListener('click', () => selectMode('plain'));
  modeMarkdown.addEventListener('click', () => selectMode('markdown'));

  copyBtn.addEventListener('click', async () => {
    statusDiv.textContent = '⏳ Processing...';
    statusDiv.className = 'status';

    chrome.runtime.sendMessage({ type: 'process-selection', mode: selectedMode }, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = '⚠ Error communicating with extension';
        statusDiv.className = 'status error';
        return;
      }
      if (response && response.error) {
        statusDiv.textContent = '⚠ ' + response.error;
        statusDiv.className = 'status error';
        return;
      }
      if (response && response.content) {
        statusDiv.textContent = '✅ Copied! (' + response.content.length + ' chars)';
        statusDiv.className = 'status success';
        setTimeout(() => { statusDiv.textContent = ''; statusDiv.className = 'status'; }, 2500);
      } else {
        statusDiv.textContent = '⚠ No content returned';
        statusDiv.className = 'status error';
      }
    });
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage(() => {
      // Fallback: no options page, just show status
      statusDiv.textContent = '⚙ Options not available yet (Pro feature soon)';
      statusDiv.className = 'status';
    });
  });

  proLink.addEventListener('click', (e) => {
    e.preventDefault();
    statusDiv.textContent = '🔒 Pro coming when Lemon Squeezy launches!';
    statusDiv.className = 'status';
  });
});