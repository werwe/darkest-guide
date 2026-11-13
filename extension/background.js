// 전역 단축키(또는 확장 아이콘 클릭)가 눌리면 열려 있는 공략 수첩 탭에 신호를 보낸다.
// 탭에 직접 실행하므로 확장을 설치하기 전에 열어 둔 탭에도 전달된다.
const URLS = ['https://*.github.io/darkest-guide/*', 'http://localhost/*', 'http://127.0.0.1/*'];
function badge(text, color) {
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
  setTimeout(() => chrome.action.setBadgeText({ text: '' }), 2500);
}
async function fire() {
  const tabs = await chrome.tabs.query({ url: URLS });
  if (!tabs.length) { badge('탭?', '#c0392b'); return; }   // 공략 수첩 탭이 열려 있지 않음
  let ok = 0;
  for (const t of tabs) {
    try {
      await chrome.scripting.executeScript({ target: { tabId: t.id }, func: () => window.postMessage({ ddCapture: 1 }, location.origin) });
      ok++;
    } catch (e) { /* 권한이 없는 탭은 건너뜀 */ }
  }
  badge(ok ? 'OK' : '실패', ok ? '#3d7a2e' : '#c0392b');
}
chrome.commands.onCommand.addListener(cmd => { if (cmd === 'capture') fire(); });
chrome.action.onClicked.addListener(() => fire());
