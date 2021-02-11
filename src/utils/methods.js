const { session } = require('electron');

const AppConfig = require('./config');

class AppMethods {
  static loadUrlWithUserAgent(window, url) {
    window.loadURL(url, { userAgent: AppConfig.AGENT });
  }
  
  static clearSession() {
    // Reset session
    session.defaultSession.flushStorageData();
    session.defaultSession.clearStorageData({ storages: ['serviceworkers'] });
  }

  static getTemplate(directory, template) {
    return `file://${directory}${AppConfig.TEMPLATES[template]}`
  }
}

module.exports = AppMethods;
