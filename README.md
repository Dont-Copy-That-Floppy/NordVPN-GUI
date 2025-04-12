# 🛡️ NordVPN Dashboard (Unofficial GUI)
A modern Electron + Vue 3 interface to control [NordVPN](https://nordvpn.com) via CLI on Linux.

![GPLv3 License](https://img.shields.io/badge/license-GPLv3-blue.svg)

---

## 📦 Features

✅ Beautiful GUI based on the official NordVPN app  
✅ Quick Connect + server picker by country/city  
✅ Live connection status, IP, and protocol  
✅ Specialty servers (P2P, Onion, Double VPN, etc.)  
✅ Kill switch toggle (planned)  
✅ Full settings & Meshnet UI (in progress)  
✅ Built with:
- Electron
- Vite
- Vue 3
- IPC to `nordvpn` CLI

---

## 🚀 Getting Started

### Requirements

- Linux system with `nordvpn` CLI installed
- Node.js 18+  
- A NordVPN account

### Setup

```bash
git clone https://github.com/yourname/nordvpn-dashboard.git
cd nordvpn-dashboard
npm install
```

### Development

```bash
# Start Vite dev server
cd src/public
npm install
npm run dev
```

In another terminal:

```bash
# Start Electron app (after Vite is ready)
cd ../..
npm run start
```

### Packaging

```bash
npm run make
```

Creates `.deb`, `.AppImage`, or `.rpm` in the `out/` folder (see `forge.config.cjs`).

---

## 📁 Project Structure

```
src/
├── main.js         # Electron main process
├── preload.js      # IPC bridge
├── public/         # Vue + Vite frontend
│   ├── src/
│   │   ├── views/          # Vue views (dashboard, settings, etc.)
│   │   ├── components/     # Shared UI components
│   │   ├── composables/    # Shared logic (auth, status, etc.)
│   │   └── router.js       # SPA routes
│   ├── public/             # Static assets
│   └── index.html
```

---

## 🛠️ Notes

- This app wraps the official `nordvpn` CLI
- You must be logged in via `nordvpn login` to use all features
- Meshnet, split tunneling, and kill switch UI are being replicated based on screenshots

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.

You are free to:

✅ Use  
✅ Study  
✅ Modify  
✅ Distribute  

You **must** share changes under the same license if distributed.

👉 [Read full GPLv3 License here](License)

---

## ❤️ Credits

- Inspired by NordVPN’s official Linux UI
- Built with ❤️ for tinkerers, Linux users, and privacy nerds

---

## 📬 Feedback

Open an issue or reach out via [GitHub Issues](https://github.com/Dont-Copy-That-Floppy/nordvpn-dashboard/issues).

---
