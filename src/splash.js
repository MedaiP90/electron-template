const { BrowserWindow } = require('electron');

const AppMethods = require('./utils/methods');

class AppSplash {
  static _splash = null;

  static present() {
    AppSplash._splash = new BrowserWindow({
      width: 700,
      height: 500,
      transparent: false,
      frame: false,
      alwaysOnTop: true,
      webPreferences: {
        contextIsolation: true
      }
    });

    AppMethods.loadUrlWithUserAgent(AppSplash._splash, AppMethods.getTemplate(__dirname, 'splash'));
  }

  static dismiss() {
    if (AppSplash._splash != null) {
      AppSplash._splash.destroy();
      AppSplash._splash = null;
    }
  }
}

module.exports = AppSplash;
