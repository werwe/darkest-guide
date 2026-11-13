// 확장에서 받은 신호를 페이지로 전달한다.
chrome.runtime.onMessage.addListener(msg => {
  if (msg && msg.ddCapture === 1) window.postMessage({ ddCapture: 1 }, location.origin);
});
