import { runCmd } from './core.js';

export function initDashboard() {
  refreshStatus();
  fetchAccountInfo();

  document.getElementById('quickConnect')?.addEventListener('click', () => runCmd('nordvpn connect'));
  document.getElementById('disconnect')?.addEventListener('click', () => runCmd('nordvpn disconnect'));
  document.getElementById('login')?.addEventListener('click', () => runCmd('nordvpn login'));
  document.getElementById('logout')?.addEventListener('click', () => runCmd('nordvpn logout'));
}

async function refreshStatus() {
  const out = await runCmd('nordvpn status');
  const el = document.getElementById('connectionStatus');
  el.textContent = parseStatus(out);
}

async function fetchAccountInfo() {
  const out = await runCmd('nordvpn account');
  const email = out.match(/Email: (.+)/)?.[1];
  const el = document.getElementById('userEmail');
  if (el) el.textContent = email || 'Unknown';
}

function parseStatus(out) {
  if (out.includes('Disconnected')) return '🔌 Disconnected';
  const map = {};
  out.split('\n').forEach(line => {
    const [k, v] = line.split(':').map(x => x.trim());
    if (k && v) map[k] = v;
  });
  return `🔒 Connected to ${map['Country'] || 'Unknown'}`;
}
