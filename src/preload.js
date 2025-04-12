const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nordvpnAPI', {
  runCommand: (cmd) => ipcRenderer.invoke('run-command', cmd),
  getStatus: () => ipcRenderer.invoke('run-command', 'nordvpn status'),
  getAccount: () => ipcRenderer.invoke('run-command', 'nordvpn account'),
  login: () => ipcRenderer.invoke('run-command', 'nordvpn login'),
  logout: () => ipcRenderer.invoke('run-command', 'nordvpn logout'),
})
