export async function runCmd(cmd) {
  const out = await window.nordvpnAPI.runCommand(cmd);
  log(cmd, out);
  return out;
}

export function log(cmd, out) {
  const logEl = document.getElementById('consoleOutput');
  if (logEl) {
    logEl.textContent += `$ ${cmd}\n${out}\n\n`;
    logEl.scrollTop = logEl.scrollHeight;
  }
}
