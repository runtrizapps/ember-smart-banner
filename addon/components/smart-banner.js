export default Ember.Component.extend({
  classNames: ['ember-smart-banner'],
  // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/16
  config: Ember.computed(function() {
    return Ember.getOwner(this).resolveRegistration('config:environment').emberSmartBanner;
  }),
  title: Ember.computed.alias('config.title'),
  description: Ember.computed.alias('config.description'),
  buttonText: Ember.computed.alias('config.buttonText'),
  imgUrl: Ember.computed.alias('config.imgUrl'),
  showBanner: Ember.computed.or('config.showBanner', 'showBannerDefault'),
  showBannerDefault: true
});
