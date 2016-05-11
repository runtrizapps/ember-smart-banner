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
  iconUrl: computed('config.iconUrl', 'bannerDefaults.iconUrl', function() {
    const configIconUrl = this.get('config.iconUrl');
    if (configIconUrl) {
      return Ember.String.htmlSafe(configIconUrl);
    }

    const defaultIconUrl  = this.get('bannerDefaults.iconUrl');
    if (defaultIconUrl) {
      return Ember.String.htmlSafe(defaultIconUrl);
    }

  }),

  showBanner: computed.and('bannerOpen', 'supportsOS', 'afterCloseBool', 'afterVisitBool'), // Set showBanner to true to always show
  link: computed.or('appStoreLink', 'marketLink', 'config.link', 'bannerDefaults.link'),

  userAgent: computed(function() {
    return (navigator.userAgent || navigator.vendor || window.opera);
  }),

  supportsOS: computed.or('supportsIOS', 'supportAndroid'),
  supportsIOS: computed.and('iOS', 'appIdIOS'),
  supportAndroid: computed.and('android', 'appIdAndroid'),

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
      this.get('iOS') && (
        this.get('config.appStoreLink') || (
          `${this.get('bannerDefaults.appStoreLinkBase')}/${this.get('appStoreLanguage')}` +
            `/app/id${this.get('appIdIOS')}`
        )
      )
    );
  }),

  titleAndroid: computed.and('android', 'config.titleAndroid'),
  descriptionAndroid: computed.and('android', 'config.descriptionAndroid'),
  linkTextAndroid: computed.and('android', 'config.linkTextAndroid'),
  appIdAndroid: computed.reads('reads.appIdAndroid'),
  marketLink: computed(function() {
    return (this.get('android') && (
      this.get('config.marketLink') || 'market://details?id=' + this.get('appIdAndroid'))
    );
  }),

  bannerDefaults: {
    appStoreLinkBase: 'https://itunes.apple.com',
    appStoreLanguage: 'en',
    appIdIOS: '123',
    marketLinkBase: 'market://details?id=',
    appIdAndroid: '123',
    title: 'App Name',
    description: 'Company Name, Inc.',
    linkText: 'View',
    link: 'https://itunes.apple.com',
    iconUrl: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png'
  },

  bannerClosed: false,
  bannerOpen: computed.not('bannerClosed'),

  actions: {
    openLink: function() {
      this.set('bannerClosed', true);
      setDayVisited();
    },

    closeBanner: function() {
      this.set('bannerClosed', true);
      setDayClosed();
    }
  },

  // Number of days after close to wait to show banner again
  // Set to true if always show banner after clicking the close button
  // Set false if the banner never shows again after clicking close
  postponeAfterClose: computed.reads('config.postponeAfterClose'),

  // Number of days after visit to wait to show banner again
  // Set to true if always show banner after clicking the visit button
  // Set false if the banner never shows again after clicking visit
  postponeAfterVisit: computed.reads('config.postponeAfterVisit'),

  afterCloseBool: computed('daysSinceClose', 'postponeAfterClose', function() {
    const postpone = this.get('postponeAfterClose');
    if (typeof postpone  === 'undefined' || postpone === null || postpone === true) {
      return true;
    }

    if (!postpone && getDayClosed()) {
      return false;
    }

    return this.gteDependentKeys('daysSinceClose', 'postponeAfterClose');
  }),

  afterVisitBool: computed('daysSinceVisit', 'postponeAfterVisit', function() {
    const postpone = this.get('postponeAfterVisit');
    if (typeof postpone  === 'undefined' || postpone === null || postpone === true) {
      return true;
    }

    if (!postpone  && getDayVisited()) {
      return false;
    }

    return this.gteDependentKeys('daysSinceVisit', 'postponeAfterVisit');
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
