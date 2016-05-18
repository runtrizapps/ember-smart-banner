/* global window, navigator */

import Ember from 'ember';
import layout from '../templates/components/smart-banner';
import getOwner from 'ember-getowner-polyfill';
import bannerStorage from '../utils/banner-storage';

const {
  computed,
} = Ember;

const {
  getDayClosed,
  getDayVisited,
  setDayClosed,
  setDayVisited,
} = bannerStorage;

export default Ember.Component.extend({
  layout,

  classNames: ['ember-smart-banner'],
  // http://discuss.emberjs.com/t/best-practices-accessing-app-config-from-addon-code/7006/16
  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberSmartBanner;
  }),

  title: computed.or('titleIOS', 'titleAndroid', 'config.title', 'bannerDefaults.title'),
  description: computed.or('descriptionIOS', 'descriptionAndroid', 'config.description', 'bannerDefaults.description'),
  linkText: computed.or('linkTextIOS', 'linkTextAndroid', 'config.linkText', 'bannerDefaults.linkText'),
  iconUrl: computed.or('config.iconUrl', 'bannerDefaults.iconUrl'),
  showBanner: computed.and('bannerOpen', 'supportsOS', 'afterCloseBool', 'afterVisitBool'), // Set showBanner to true to always show
  link: computed.or('displayAppStoreLink', 'displayMarketLink'),

  userAgent: computed(function() {
    return (navigator.userAgent || navigator.vendor || window.opera);
  }),

  supportsOS: computed.or('supportsIOS', 'supportsAndroid'),
  supportsIOS: computed.and('iOS', 'appIdIOS'),
  supportsAndroid: computed.and('android', 'appIdAndroid'),

  iOS: computed('userAgent', function() {
    const userAgent = this.get('userAgent');
    return (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i));
  }),

  android: computed('userAgent', function() {
    const userAgent = this.get('userAgent');
    return (userAgent.match(/Android/i));
  }),

  titleIOS: computed.and('iOS', 'config.titleIOS'),
  descriptionIOS: computed.and('iOS', 'config.descriptionIOS'),
  linkTextIOS: computed.and('iOS', 'config.linkTextIOS'),
  appStoreLanguage: computed.or('config.appStoreLanguage', 'bannerDefaults.appStoreLanguage'),
  appIdIOS: computed.or('config.appIdIOS', 'bannerDefaults.appIdIOS'),
  appStoreLink: computed(function() {
    return (
      `${this.get('bannerDefaults.appStoreLinkBase')}/${this.get('appStoreLanguage')}` +
        `/app/id${this.get('appIdIOS')}`
    );
  }),
  displayAppStoreLink: computed.and('supportsIOS','appStoreLink'),

  titleAndroid: computed.and('android', 'config.titleAndroid'),
  descriptionAndroid: computed.and('android', 'config.descriptionAndroid'),
  linkTextAndroid: computed.and('android', 'config.linkTextAndroid'),
  appIdAndroid: computed.or('config.appIdAndroid', 'bannerDefaults.appIdAndroid'),
  marketLink: computed(function() {
    return `${this.get('bannerDefaults.marketLinkBase')}${this.get('appIdAndroid')}`;
  }),
  displayMarketLink: computed.and('supportsAndroid','marketLink'),

  bannerDefaults: {
    appStoreLinkBase: 'https://itunes.apple.com',
    appStoreLanguage: 'en',
    marketLinkBase: 'market://details?id=',
    title: 'Download our App',
    linkText: 'View',
    iconUrl: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png'
  },

  bannerClosed: false,
  bannerOpen: computed.not('bannerClosed'),

  actions: {
    openLink: function() {
      this.set('bannerClosed', true);
      setDayVisited();
      const visitFn = Ember.getWithDefault(this, 'attrs.onvisit', Ember.K);
      visitFn();
    },

    closeBanner: function(e) {
      e.preventDefault();
      this.set('bannerClosed', true);
      setDayClosed();
      const closeFn = Ember.getWithDefault(this, 'attrs.onclose', Ember.K);
      closeFn();
    }
  },

  // Number of days after close to wait to show banner again
  // Set to true if always show banner after clicking the close button
  // Set false if the banner never shows again after clicking close
  openAfterClose: computed.reads('config.openAfterClose'),

  // Number of days after visit to wait to show banner again
  // Set to true if always show banner after clicking the visit button
  // Set false if the banner never shows again after clicking visit
  openAfterVisit: computed.reads('config.openAfterVisit'),

  neverShowAfterClose: computed.equal('openAfterClose', false),
  recentlyClosed: computed.bool('daysSinceClose'),
  restrictAfterClose: restrictMacro('openAfterClose'),

  neverShowAfterVisit: computed.equal('openAfterVisit', false),
  recentlyVisited: computed.bool('daysSinceVisit'),
  restrictAfterVisit: restrictMacro('openAfterVisit'),


  afterCloseBool: computed('daysSinceClose', 'openAfterClose', function() {
    const wasRecentlyClosed = this.get('recentlyClosed');
    const neverShowAfterClose = this.get('neverShowAfterClose');
    const restrictAfterClose = this.get('restrictAfterClose');

    if (neverShowAfterClose && wasRecentlyClosed) {
      // never show if { openAfterClose: false } && has been closed
      return false;
    }

    if (restrictAfterClose && wasRecentlyClosed) {
      // if { openAfterClose: isValidNumber }
      return this.gteDependentKeys('daysSinceClose', 'openAfterClose');
    }

    return true;
  }),

  afterVisitBool: computed('daysSinceVisit', 'openAfterVisit', function() {
    const wasRecentlyVisited = this.get('recentlyVisited');
    const neverShowAfterVisit = this.get('neverShowAfterVisit');
    const restrictAfterVisit = this.get('restrictAfterVisit');

    if (neverShowAfterVisit && wasRecentlyVisited) {
      // never show if { openAfterVisit: false } && has been visited
      return false;
    }

    if (restrictAfterVisit && wasRecentlyVisited) {
      // if { openAfterVisit: isValidNumber }
      return this.gteDependentKeys('daysSinceVisit', 'openAfterVisit');
    }

    return true;
  }),

  gteDependentKeys(firstKey, secondKey) {
    return (this.get(firstKey) >= this.get(secondKey));
  },

  daysSinceClose: computed(function() {
    const timeSinceClosed = new Date() - Date.parse(getDayClosed());
    return Math.floor(timeSinceClosed / (24 * 60 * 60 * 1000)); // Convert ms to days
  }),

  daysSinceVisit: computed(function() {
    const timeSinceVisited = new Date() - Date.parse(getDayVisited());
    return Math.floor(timeSinceVisited / (24 * 60 * 60 * 1000)); // Convert ms to days
  }),

  //https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
});

function restrictMacro(delayKey) {
  return computed(delayKey, function() {
    const openDelay = this.get(delayKey);
    const isValidNumber = isNaN(parseInt(openDelay, 10)) === false;
    return isValidNumber;
  });
}
