const { app, BrowserWindow, Menu } = require("electron");

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
    title: 'Electron Template'
  });

  // Use the custom title
  win.on('page-title-updated', event => event.preventDefault());
  // Closing behavior
  win.on('closed', () => {
    win = null;
    splash = null;
  });
  // Prevent from spawning new windows
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    win.loadURL(url);
  });

  // Build application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  // Load main window
  win.loadURL('https://github.com/MedaiP90/electron-template');

  // Destroy splash screen when ready
  win.once('ready-to-show', () => {
    win.show();
    setTimeout(() => splash.destroy(), 1000);
  });

  // Use this for debugging
  // win.webContents.openDevTools();
}

// Create window when app is ready
app.on('ready', createWindow);
