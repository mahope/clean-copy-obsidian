/**
 * Clean Copy — Content Script  
 * Injected into pages for toast notifications
 */
(function() {
  // Listen for toast/error notifications from background
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'show-toast') {
      showToast(request.message);
    }
    if (request.type === 'show-error') {
      showToast(request.message, true);
    }
  });

  function showToast(msg, isError = false) {
    const existing = document.querySelector('.clean-copy-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'clean-copy-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border-radius: 8px;
      background: ${isError ? '#ef5350' : '#1a1a2e'};
      color: #fff;
      font-size: 13px;
      z-index: 2147483647;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: opacity 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
})();