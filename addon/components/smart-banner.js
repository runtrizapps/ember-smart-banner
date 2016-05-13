export default Ember.Component.extend({
  // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/16
  config: Ember.computed(function() {
    return Ember.getOwner(this).resolveRegistration('config:environment').emberSmartBanner;
  }),
  title: Ember.computed.or('titleIOS','titleAndroid','config.title'),
  description: Ember.computed.alias('descriptionIOS', 'descriptionAndroid', 'config.description'),
  buttonText: Ember.computed.alias('buttonTextIOS', 'buttonTextAndroid', 'config.buttonText'),
  imgUrl: Ember.computed.alias('config.imgUrl'),
  showBanner: Ember.computed.or('config.showBanner', 'showBannerDefault'),
  link: "",
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
  titleIOS: Ember.computed(function() {
    return (this.get('iOS') && this.get('config.titleIOS'));
  }),
  titleAndroid: Ember.computed(function() {
    return (this.get('android') && this.get('config.titleAndroid'));
  }),
  descriptionIOS: Ember.computed(function() {
    return (this.get('iOS') && this.get('config.descriptionIOS'));
  }),
  descriptionAndroid: Ember.computed(function() {
    return (this.get('android') && this.get('config.descriptionAndroid'));
  }),
  buttonTextIOS: Ember.computed(function() {
    return (this.get('iOS') && this.get('config.buttonTextIOS'));
  }),
  buttonTextAndroid: Ember.computed(function() {
    return (this.get('android') && this.get('config.buttonTextAndroid'));
  }),
  appStoreLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.appStoreLink') || 'https://itunes.apple.com/us/app/' + this.get('iosAppId'))); // TODO configure appStoreLanguage
  }),
  marketLink: Ember.computed(function() {
    return (this.get('iOS') && (this.get('config.marketLink') || 'market://details?id=' + this.get('androidAppId')));
  }),
  iosAppId: Ember.computed.alias('config.iosAppId'),
  androidAppId: Ember.computed.alias('config.iosAppId'),

  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});
