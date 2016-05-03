// TODO - proper imports - how did the generator not handle this?
// TODO - assign const's from Ember: computed, getOwner
import Ember from 'ember';
const {
  computed,
  getOwner,
} = Ember;

export default Ember.Component.extend({
  // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/16
  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberSmartBanner;
  }),

  title: computed.or('titleIOS', 'titleAndroid', 'config.title'),
  description: computed.or('descriptionIOS', 'descriptionAndroid', 'config.description'),
  buttonText: computed.or('buttonTextIOS', 'buttonTextAndroid', 'config.buttonText'),
  iconUrl: computed.reads('config.iconUrl'),
  showBannerReminder: computed.or('config.alwayShowBanner', 'afterCloseBool', 'afterVisitBool', 'showBannerDefault'),
  showBanner: computed.and('showBannerReminder', 'openBanner'),
  alwayShowBanner: '',  // Set showBanner to true to always show
  showBannerDefault: true,
  link: computed.or('appStoreLink', 'marketLink', 'config.link'),

  mobileOperatingSystem: computed(function() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      return 'iOS';
    } else if (userAgent.match(/Android/i)) {
      return 'Android';
    } else {
      return 'unknown';
    }
  }),

  showIOS: computed.equal('mobileOperatingSystem', 'iOS'),
  showAndroid: computed.equal('mobileOperatingSystem', 'Android'),

  titleIOS: computed.and('iOS', 'config.titleIOS'),
  descriptionIOS: computed.and('iOS', 'config.descriptionIOS'),
  buttonTextIOS: computed.and('iOS', 'config.buttonTextIOS'),
  appStoreLanguage: computed.reads('config.appStoreLanguage'),
  appIdIOS: computed.alias('reads.iosAppId'),
  appStoreLink: computed(function() {
    return (this.get('iOS') && (this.get('config.appStoreLink') || 'https://itunes.apple.com/' + this.get('appStoreLanguage') + '/app/' + this.get('iosAppId')));
  }),

  titleAndroid: computed.and('android', 'config.titleAndroid'),
  descriptionAndroid: computed.and('android', 'config.descriptionAndroid'),
  buttonTextAndroid: computed.and('android', 'config.buttonTextAndroid'),
  appIdAndroid: computed.alias('reads.androidAppId'),
  marketLink: computed(function() {
    return (this.get('iOS') && (this.get('config.marketLink') || 'market://details?id=' + this.get('androidAppId')));
  }),

  closeBanner: 'false',
  openBanner: computed.none('closeBanner'),

  actions: {
    openLink: function() {
      this.setTimeStamp('lastDayVisited');
      let url = this.get('link');
      window.location.replace(url);
    },

    closeBanner: function() {
      this.set('closeBanner', true);
      this.setTimeStamp('lastDayClosed');
    }
  },

  setTimeStamp(key) {
    const now = new Date();
    this.setItem(key, now);
  },

  setItem(key, value) {
    localStorage.setItem(this._namespacedKey(key), JSON.stringify(value));
  },

  getItem(key) {
    const result = localStorage.getItem(this._namespacedKey(key));
    if (result) {
      return JSON.parse(result);
    }
  },

  namespace: 'ember-smart-banner',

  _namespacedKey(keyName) {
    return this.get('namespace') + `.${keyName}`;
  },

  reminderAfterClose: computed.reads('config.reminderAfterClose'), // Number of days after user closes banner to wait to show banner again, 0 for always show
  reminderAfterVisit: computed.reads('config.reminderAfterVisit'), // Number of days after visit to wait to show banner again, 0 for always show

  afterCloseBool: computed.gte('daysSinceClose', 'reminderAfterClose'),
  afterVisitBool: computed.gte('daysSinceVisit', 'reminderAfterVisit'),

  daysSinceClose: computed(function() {
    const timeSinceClosed = new Date() - Date.parse(getItem('lastDayClosed'));
    return Math.floor(timeSinceClosed / (24 * 60 * 60 * 1000)); // Convert ms to days
  }),

  daysSinceVisit: computed(function() {
    const timeSinceVisited = new Date() - Date.parse(getItem('lastDayVisited'));
    return Math.floor(timeSinceVisited / (24 * 60 * 60 * 1000)); // Convert ms to days
  }),

  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});
