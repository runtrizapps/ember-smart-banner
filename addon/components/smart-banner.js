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
  imgUrl: Ember.computed.reads('config.imgUrl'),
  showBanner: Ember.computed.or('config.showBanner', 'showBannerDefault'),
  link: Ember.computed.or('appStoreLink', 'marketLink', 'config.link'),
  showBannerDefault: true,
  mobileOperatingSystem: Ember.computed(function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      return 'iOS';
    } else if (userAgent.match(/Android/i)) {
      return 'Android';
    } else {
      return 'unknown';
    }
  }),
  iOS: Ember.computed.equal('mobileOperatingSystem', 'iOS'),
  android: Ember.computed.equal('mobileOperatingSystem', 'iOS'),

  titleIOS: Ember.computed.and('iOS','config.titleIOS'),
  titleAndroid: Ember.computed.and('android','config.titleAndroid'),
  descriptionIOS: Ember.computed.and('iOS','config.descriptionIOS'),
  descriptionAndroid: Ember.computed.and('android','config.descriptionAndroid'),
  buttonTextIOS: Ember.computed.and('iOS','config.buttonTextIOS'),
  buttonTextAndroid: Ember.computed.and('android','config.buttonTextAndroid'),
  appStoreLanguage: Ember.computed.reads('config.appStoreLanguage'),
  appStoreLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.appStoreLink') || 'https://itunes.apple.com/' +this.get('appStoreLanguage') + '/app/' + this.get('iosAppId')));
  }),
  marketLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.marketLink') || 'market://details?id=' + this.get('androidAppId')));
  }),
  actions: {
    openLink: function() {
      let url = this.get('link');
      window.location.replace(url);
    }
  },
  iosAppId: Ember.computed.alias('reads.iosAppId'),
  androidAppId: Ember.computed.alias('reads.androidAppId'),


  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});
