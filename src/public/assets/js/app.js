const links = document.querySelectorAll('.sidebar-link');
const content = document.getElementById('content');
const title = document.getElementById('section-title');

links.forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const page = link.getAttribute('data-page');
    title.textContent = page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const res = await fetch(`./settings/${page}.html`);
    const html = await res.text();
    content.innerHTML = html;
  });
});

// Load default page
document.querySelector('.sidebar-link.active').click();

async function loadCountries() {
  console.log('[AUTO] Loading countries from nordvpn CLI...');
  const out = await window.nordvpnAPI.runCommand('nordvpn countries');
  const countryList = document.getElementById('countryList');
  const countries = out.trim().split('\n');

  countryList.innerHTML = ''; // Clear any existing
  countries.forEach(country => {
    const li = document.createElement('li');
    li.classList.add('server-item');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '4px 0';

    const span = document.createElement('span');
    span.textContent = country;

    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = 'Connect';
    btn.onclick = () => window.nordvpnAPI.runCommand(`nordvpn connect "${country}"`);

    li.appendChild(span);
    li.appendChild(btn);
    countryList.appendChild(li);
  });
}

// Automatically call when servers.html is loaded
if (document.getElementById('countryList')) {
  loadCountries();
}

document.addEventListener('input', e => {
  if (e.target.id === 'countrySearch') {
    const search = e.target.value.toLowerCase();
    document.querySelectorAll('#countryList li').forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(search) ? 'flex' : 'none';
    });
  }
});

document.getElementById('themeSelect').onchange = e => {
  const theme = e.target.value;
  document.body.classList.remove('light', 'dark');
  if (theme !== 'system') {
    document.body.classList.add(theme);
  }
  localStorage.setItem('theme', theme);
};

const saved = localStorage.getItem('theme');
if (saved && saved !== 'system') {
  document.body.classList.add(saved);
}
