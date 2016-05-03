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
  showBannerReminder: Ember.computed.or('config.alwayShowBanner', 'afterCloseBool', 'afterVisitBool','showBannerDefault'),
  showBanner: Ember.computed.and('showBannerReminder', 'openBanner'),
  alwayShowBanner: "",  // Set showBanner to true to always show
  showBannerDefault: true,
  link: Ember.computed.or('appStoreLink', 'marketLink', 'config.link'),

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

  closeBanner: 'false',
  openBanner: Ember.computed.none('closeBanner'),

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

  reminderAfterClose: Ember.computed.reads('config.reminderAfterClose'), // Number of days after user closes banner to wait to show banner again, 0 for always show
  reminderAfterVisit: Ember.computed.reads('config.reminderAfterVisit'), // Number of days after visit to wait to show banner again, 0 for always show

  afterCloseBool: Ember.computed.gte('daysSinceClose', 'reminderAfterClose'),
  afterVisitBool: Ember.computed.gte('daysSinceVisit', 'reminderAfterVisit'),

  daysSinceClose: Ember.computed(function() {
    const timeSinceClosed = new Date() - Date.parse(getItem('lastDayClosed'));
    return Math.floor(timeSinceClosed/(24 * 60 * 60 * 1000)); // Convert ms to days
  }),
  daysSinceVisit: Ember.computed(function() {
    const timeSinceVisited = new Date() - Date.parse(getItem('lastDayVisited'));
    return Math.floor(timeSinceVisited/(24 * 60 * 60 * 1000)); // Convert ms to days
  }),

  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});
