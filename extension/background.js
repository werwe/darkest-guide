// 전역 단축키가 눌리면 열려 있는 공략 수첩 탭에 신호를 보낸다.
const URLS = ['https://*.github.io/darkest-guide/*', 'http://localhost/*', 'http://127.0.0.1/*'];
async function fire() {
  const tabs = await chrome.tabs.query({ url: URLS });
  for (const t of tabs) chrome.tabs.sendMessage(t.id, { ddCapture: 1 }).catch(() => {});
}
chrome.commands.onCommand.addListener(cmd => { if (cmd === 'capture') fire(); });
