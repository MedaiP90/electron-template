const Store = require('electron-store');

const AppConfig = require('./config');

class AppStore {
  static store = new Store();

  static saveWidth(newWidth) {
    AppStore.store.set(AppConfig.STORE_PREF.width, newWidth);
  }

  static saveHeight(newHeight) {
    AppStore.store.set(AppConfig.STORE_PREF.height, newHeight);
  }

  static getWidth() {
    return AppStore.store.get(AppConfig.STORE_PREF.width);
  }

  static getHeight() {
    return AppStore.store.get(AppConfig.STORE_PREF.height);
  }
}

module.exports = AppStore;
