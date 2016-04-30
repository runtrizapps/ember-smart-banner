// TODO - proper imports - how did the generator not handle this?
// TODO - assign const's from Ember: computed, getOwner

export default Ember.Component.extend({
  // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/16
  config: Ember.computed(function() {
    return Ember.getOwner(this).resolveRegistration('config:environment').emberSmartBanner;
  }),
  title: Ember.computed.or('titleIOS','titleAndroid','config.title'),
  description: Ember.computed.or('descriptionIOS', 'descriptionAndroid', 'config.description'),
  buttonText: Ember.computed.or('buttonTextIOS', 'buttonTextAndroid', 'config.buttonText'),
  iconUrl: Ember.computed.reads('config.iconUrl'),
  showBanner: Ember.computed.or('config.showBanner', 'showBannerDefault'),
  link: Ember.computed.or('appStoreLink', 'marketLink', 'config.link'),
  showBannerDefault: true,

  mobileOperatingSystem: Ember.computed(function() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      return 'iOS';
    } else if (userAgent.match(/Android/i)) {
      return 'Android';
    } else {
      return 'unknown';
    }
  }),
  showIOS: Ember.computed.equal('mobileOperatingSystem', 'iOS'),
  showAndroid: Ember.computed.equal('mobileOperatingSystem', 'Android'),

  titleIOS: Ember.computed.and('iOS','config.titleIOS'),
  descriptionIOS: Ember.computed.and('iOS','config.descriptionIOS'),
  buttonTextIOS: Ember.computed.and('iOS','config.buttonTextIOS'),
  appStoreLanguage: Ember.computed.reads('config.appStoreLanguage'),
  appIdIOS: Ember.computed.alias('reads.iosAppId'),
  appStoreLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.appStoreLink') || 'https://itunes.apple.com/' +this.get('appStoreLanguage') + '/app/' + this.get('iosAppId')));
  }),

  titleAndroid: Ember.computed.and('android','config.titleAndroid'),
  descriptionAndroid: Ember.computed.and('android','config.descriptionAndroid'),
  buttonTextAndroid: Ember.computed.and('android','config.buttonTextAndroid'),
  appIdAndroid: Ember.computed.alias('reads.androidAppId'),
  marketLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.marketLink') || 'market://details?id=' + this.get('androidAppId')));
  }),

  closeBanner: "",

  actions: {
    openLink: function() {
      this.setTimeStamp('lastDayVisited');
      let url = this.get('link');
      window.location.replace(url);
    },
    closeBanner: function() {
      this.set('closeBanner', true);
      this.setTimeStamp('lastDayVisited');
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

  alwaysShowBanner: "", // do not check browser, always show banner
  reminderAfterClose: "", // number of days after user closes banner to wait to show banner again
  reminderAfterVisit: "", // number of days after visit to wait to show banner again



  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});
