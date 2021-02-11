const { app } = require('electron');

class AppConfig {
  static AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.151 Safari/537.36';

  static URLS = {
    default: 'https://github.com/MedaiP90/electron-template'
  };

  static TEMPLATES = {
    splash: '/templates/splash.html'
  };

  static STORE_PREF = {
    height: 'height',
    width: 'width'
  };

  static MENUS = {
    empty: [],
    default: [
      {
        label: 'File',
        submenu: [
          {
            label: 'Quit',
            click: () => app.quit()
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Reload',
            role: 'reload'
          },
          {
            label: 'Force reload',
            role: 'forceReload'
          }
        ]
      }
    ]
  };
}

module.exports = AppConfig;