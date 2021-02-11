const { app, BrowserWindow, Menu } = require('electron');

const AppConfig = require('./utils/config');
const AppSplash = require('./splash');
const AppStore = require('./utils/store');
const AppMethods = require('./utils/methods');

let win; // Holds the app window

function createWindow() {
  AppMethods.clearSession();

  // Create a new splash window 
  AppSplash.present();

  // Create the main window
  win = new BrowserWindow({
    width: AppStore.getWidth() || 1366,
    height: AppStore.getHeight() || 768,
    title: 'Electron Template',
    icon: 'static/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  // Use the custom title
  win.on('page-title-updated', event => event.preventDefault());
  // Closing behavior
  win.on('closed', () => {
    AppSplash.dismiss();
    win = null;
  });
  // Prevent from spawning new windows
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    AppMethods.loadUrlWithUserAgent(win, url);
  });
  // Catch window resizing for storing the information
  win.on('resize', () => {
    const size = win.getSize();

    // Save to local storage
    AppStore.saveWidth(size[0]);
    AppStore.saveHeight(size[1]);
  });
  // App content is loaded
  win.webContents.on('did-finish-load', () => {
    // Destroy splash screen
    AppSplash.dismiss();
  });

  // Build application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(AppConfig.MENUS.default));

  // Load main window
  AppMethods.loadUrlWithUserAgent(win, AppConfig.URLS.default);

  // Use this for debugging
  if (process.env.NODE_ENV == 'dev') {
    win.webContents.openDevTools();
  }
}

// Create window when app is ready
app.on('ready', createWindow);
