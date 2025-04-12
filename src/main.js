console.log('[BOOT] Loading main.js');

import { app, BrowserWindow, ipcMain, Tray, Menu, Notification } from 'electron';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import AutoLaunch from 'auto-launch'; // ✅ clean ESM import

console.log('[BOOT] Starting module loading...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('[DEBUG] __dirname:', __dirname);

let tray = null;

function createWindow() {
  console.log('[FLOW] createWindow()');
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  console.log('[FLOW] Window created, loading index.html');
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.openDevTools(); // open dev tools on launch
  createTray(win);
}

function createTray(win) {
  console.log('[FLOW] createTray()');
  const trayIconPath = path.join(__dirname, 'icon.png');
  tray = new Tray(trayIconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Connect', click: () => win.webContents.send('tray-command', 'connect') },
    { label: 'Disconnect', click: () => win.webContents.send('tray-command', 'disconnect') },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setToolTip('NordVPN GUI');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  console.log('[FLOW] app.whenReady() triggered');

  const autolaunchOptions = {
    name: 'NordVPN Dashboard',
    ...(app.isPackaged ? { path: app.getPath('exe') } : {})
  };

  console.log('[DEBUG] AutoLaunch options:', autolaunchOptions);

  const vpnAutoLauncher = new AutoLaunch(autolaunchOptions);

  vpnAutoLauncher.enable().catch(err => {
    console.error('[ERROR] AutoLaunch failed to enable:', err);
  });

  createWindow();
});

ipcMain.handle('run-command', async (_event, command) => {
  console.log('[IPC] run-command:', command);
  return new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('[CMD ERROR]', err);
        resolve(stderr || err.message);
      } else {
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('notify', (_event, title, body) => {
  console.log('[IPC] notify:', title, body);
  new Notification({ title, body }).show();
});
