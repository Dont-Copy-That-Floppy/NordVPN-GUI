import { initSettingsTab } from './settings.js';
import { initDashboard } from './dashboard.js';

const links = document.querySelectorAll('.sidebar-link');
const content = document.getElementById('content');
const title = document.getElementById('section-title');

links.forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const page = link.getAttribute('data-page');
    title.textContent = formatTitle(page);

    const res = await fetch(`./settings/${page}.html`);
    const html = await res.text();
    content.innerHTML = html;

    if (page === 'dashboard') initDashboard();
    else initSettingsTab(page);
  });
});

function formatTitle(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Load default page
document.querySelector('.sidebar-link.active').click();
