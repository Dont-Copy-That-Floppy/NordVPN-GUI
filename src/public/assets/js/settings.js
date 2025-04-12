import { runCmd } from './core.js';

export function initSettingsTab(page) {
  const $ = (id) => document.getElementById(id);

  const bindToggle = (id, setting) => {
    $(id)?.addEventListener('change', e => {
      runCmd(`nordvpn set ${setting} ${e.target.checked ? 'on' : 'off'}`);
    });
  };

  const bindDropdown = (id, setting) => {
    $(id)?.addEventListener('change', e => {
      runCmd(`nordvpn set ${setting} ${e.target.value}`);
    });
  };

  switch (page) {
    case 'connection':
      bindDropdown('themeSelect', 'theme');
      break;

    case 'kill-switch':
      bindToggle('internetKillSwitch', 'killswitch');
      bindToggle('appKillSwitch', 'app-killswitch');
      break;

    case 'meshnet':
      bindToggle('meshToggle', 'meshnet');
      break;

    case 'advanced':
      bindToggle('lanDiscoveryToggle', 'lan-discovery');
      bindToggle('remoteAccessToggle', 'remote-access');
      bindToggle('notifyToggle', 'notify');
      bindToggle('analyticsToggle', 'analytics');

      $('#dnsInput')?.addEventListener('keyup', e => {
        if (e.key === 'Enter') runCmd(`nordvpn set dns ${e.target.value}`);
      });
      break;

    case 'appearance':
      bindDropdown('themeSelect', 'theme');
      break;

    case 'servers':
      loadCountries();
      break;
  }

  if (page === 'servers') {
    $('#countrySearch')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#countryList li').forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
      });
    });
  }
}

async function loadCountries() {
  const out = await runCmd('nordvpn countries');
  const countries = out.trim().split('\n');
  const list = document.getElementById('countryList');
  if (!list) return;

  list.innerHTML = '';
  countries.forEach(c => {
    const li = document.createElement('li');
    li.className = 'server-item';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';

    const label = document.createElement('span');
    label.textContent = c;

    const btn = document.createElement('button');
    btn.textContent = 'Connect';
    btn.className = 'button';
    btn.onclick = () => runCmd(`nordvpn connect "${c}"`);

    li.append(label, btn);
    list.appendChild(li);
  });
}
