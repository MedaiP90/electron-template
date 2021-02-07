const { app, BrowserWindow, Menu } = require('electron');

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.131 Safari/537.36';

let win; // Holds the app window
let splash;
let menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Reload',
        role: 'reload'
      }
    ]
  }
];

function createWindow() {
  // Create a new splash window 
  splash = new BrowserWindow({
    width: 700,
    height: 500,
    transparent: false,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadURL(`file://${__dirname}/splash.html`);

  // -----------------------------------------------
  // Create the main window
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    title: 'Electron Template',
    icon: 'static/icon.png'
  });

  // Use the custom title
  win.on('page-title-updated', event => event.preventDefault());
  // Closing behavior
  win.on('closed', () => {
    win = null;
  });
  // Prevent from spawning new windows
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    win.loadURL(url);
  });

  // Build application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  // Load main window
  win.loadURL('https://github.com/MedaiP90/electron-template', { userAgent });

  // Destroy splash screen when ready
  win.webContents.on('did-finish-load', () => {
    splash.destroy();
    splash = null;
  });

  // Use this for debugging
  // win.webContents.openDevTools();
}

// Create window when app is ready
app.on('ready', createWindow);
