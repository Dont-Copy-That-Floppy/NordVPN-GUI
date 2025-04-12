console.log('[BOOT] renderer.js loaded');

const consoleOutput = document.createElement('pre');
consoleOutput.id = 'consoleOutput';
consoleOutput.style = 'margin-top: 20px; background: #111; color: #0f0; padding: 10px; font-size: 12px; height: 150px; overflow-y: auto;';
document.body.appendChild(consoleOutput);

function log(cmd, out) {
  consoleOutput.textContent += `$ ${cmd}\n${out}\n\n`;
  console.log('[LOG]', cmd, out);
}

console.log('[INIT] Adding DOMContentLoaded listener');

window.addEventListener('DOMContentLoaded', async () => {
  console.log('[INIT] DOM ready');

  buildDashboardUI();
  buildServersUI();
  buildSettingsUI();
  buildMeshnetUI();

  console.log('[INIT] All UI panels built');

  if (window.nordvpnAPI?.onTrayCommand) {
    console.log('[INIT] Setting tray command handler');
    window.nordvpnAPI.onTrayCommand((command) => {
      console.log('[TRAY COMMAND RECEIVED]', command);
      if (command === 'connect') {
        console.log('[ACTION] Tray → quickConnect()');
        quickConnect();
      }
      if (command === 'disconnect') {
        console.log('[ACTION] Tray → nordvpn disconnect');
        runCmd('nordvpn disconnect');
      }
    });
  } else {
    console.warn('[WARN] Tray command listener is missing');
  }
});

// =======================
// DASHBOARD PANEL
// =======================
function buildDashboardUI() {
  console.log('[BUILD] buildDashboardUI()');
  const dashboardPanel = document.getElementById('dashboard');

  dashboardPanel.innerHTML = `
    <h2>Status</h2>
    <p id="vpnStatus">Loading...</p>
    <button onclick="refreshStatus()">Refresh</button>

    <h2>Account</h2>
    <p id="accountInfo">Loading...</p>
    <button onclick="login()">Login</button>
    <button onclick="logout()">Logout</button>
  `;

  refreshStatus();
  fetchAccountInfo();
}

async function refreshStatus() {
  console.log('[ACTION] refreshStatus()');
  const out = await runCmd('nordvpn status');
  const statusEl = document.getElementById('vpnStatus');
  statusEl.textContent = parseStatus(out);
}

function parseStatus(output) {
  console.log('[DEBUG] parseStatus()');
  const map = {};
  output.split('\n').forEach(line => {
    const [k, v] = line.split(':').map(x => x.trim());
    if (k && v) map[k.toLowerCase()] = v;
  });

  if (!map['status']) return 'Unable to determine status';
  if (map['status'].toLowerCase() === 'disconnected') return 'Disconnected';

  return `
    Status: ${map['status']}
    Server: ${map['server'] || 'N/A'}
    IP: ${map['your new ip'] || 'N/A'}
    Country: ${map['country'] || 'N/A'}
    Technology: ${map['technology'] || 'N/A'}
    Protocol: ${map['protocol'] || 'N/A'}
  `.trim();
}

async function fetchAccountInfo() {
  console.log('[ACTION] fetchAccountInfo()');
  const out = await runCmd('nordvpn account');
  document.getElementById('accountInfo').textContent = out.trim();
}

async function login() {
  console.log('[ACTION] login()');
  await runCmd('nordvpn login');
  fetchAccountInfo();
}

async function logout() {
  console.log('[ACTION] logout()');
  await runCmd('nordvpn logout');
  fetchAccountInfo();
}

// =======================
// SERVERS PANEL
// =======================
function buildServersUI() {
  console.log('[BUILD] buildServersUI()');
  const serversPanel = document.getElementById('servers');

  serversPanel.innerHTML = `
    <h2>Server Selection</h2>
    <button onclick="quickConnect()">Quick Connect</button><br><br>
    <label>Country:</label>
    <select id="countrySelect" onchange="loadCities()"><option value="">-- Select Country --</option></select>
    <label>City:</label>
    <select id="citySelect"><option value="">-- All Cities --</option></select>
    <button onclick="connectToLocation()">Connect</button>
    <h3>Server Groups</h3>
    <div id="groupButtons"></div>
  `;

  loadCountries();
  loadGroups();
}

async function quickConnect() {
  console.log('[ACTION] quickConnect()');
  await runCmd('nordvpn connect');
}

async function loadCountries() {
  console.log('[ACTION] loadCountries()');
  const out = await runCmd('nordvpn countries');
  const list = out.trim().split('\n');
  const select = document.getElementById('countrySelect');
  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = c;
    select.appendChild(opt);
  });
}

async function loadCities() {
  console.log('[ACTION] loadCities()');
  const country = document.getElementById('countrySelect').value;
  if (!country) return;
  const out = await runCmd(`nordvpn cities "${country}"`);
  const cities = out.trim().split('\n');
  const select = document.getElementById('citySelect');
  select.innerHTML = '<option value="">-- All Cities --</option>';
  cities.forEach(c => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = c;
    select.appendChild(opt);
  });
}

async function connectToLocation() {
  console.log('[ACTION] connectToLocation()');
  const country = document.getElementById('countrySelect').value;
  const city = document.getElementById('citySelect').value;
  const cmd = city ? `nordvpn connect "${city}"` : `nordvpn connect "${country}"`;
  await runCmd(cmd);
}

async function loadGroups() {
  console.log('[ACTION] loadGroups()');
  const out = await runCmd('nordvpn groups');
  const groups = out.trim().split('\n');
  const container = document.getElementById('groupButtons');
  groups.forEach(group => {
    const btn = document.createElement('button');
    btn.textContent = group;
    btn.onclick = () => {
      console.log('[CLICK] connect to group:', group);
      runCmd(`nordvpn connect "${group}"`);
    };
    btn.style.marginRight = '8px';
    container.appendChild(btn);
  });
}

// =======================
// UTIL
// =======================
async function runCmd(cmd) {
  console.log('[RUN CMD]', cmd);
  const out = await window.nordvpnAPI.runCommand(cmd);
  log(cmd, out);
  return out;
}
