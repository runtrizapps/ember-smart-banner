/* global localStorage */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('smart-banner', 'Integration | Component | ember smart banner', {
  integration: true
});

test('it renders on iOS when an appId is set', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').attr('href'), 'https://itunes.apple.com/en/app/id123');
});

test('it does not render on iOS unless an appId is set', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', null);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is not rendered');
});

test('it does not render on iOS unless iOS platform detected', function(assert) {
  this.set('iOS', false);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is not rendered');
});

test('it renders on Android when an appId is set', function(assert) {
  this.set('iOS', false);
  this.set('appIdIOS', null);
  this.set('android', true);
  this.set('appIdAndroid', 123);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').attr('href'), 'market://details?id=123', 'it renders with android link');
});

test('it does not render on Android unless an appId is set', function(assert) {
  this.set('iOS', false);
  this.set('appIdIOS', null);
  this.set('android', true);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is not rendered');
});

test('it renders config parameters', function(assert) {
  this.set('iOS', true);

  this.render(hbs`{{smart-banner
    iOS=iOS
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--title').text(), 'App Title', 'The title is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--description').text(), 'Description', 'The description is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').text().trim(), 'View', 'The link text is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').attr('href'), 'https://itunes.apple.com/en/app/id123');
  assert.equal(smartBanner.find('.ember-smart-banner--icon').attr('style'), 'background-image: url(http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png)');
});

test('it renders banner defaults if no config parameters', function(assert) {
  this.set('showBanner', true);
  this.set('config', undefined);
  this.set('iOS', null);

  this.render(hbs`{{smart-banner
    showBanner=showBanner
    config=config
    iOS=iOS
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--title').text(), 'App Name', 'The title is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--description').text(), 'Company Name, Inc.', 'The description is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').text().trim(), 'View', 'The link text is set correctly.');
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').attr('href'), 'https://itunes.apple.com');
  assert.equal(smartBanner.find('.ember-smart-banner--icon').attr('style'), 'background-image: url(http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png)');
});

test('is can set title through template', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    title="TEST Title"
    iOS=iOS
    appIdIOS=appIdIOS
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--title').text(), 'TEST Title', 'The title is set correctly.');
});

test('is can set description through template', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    description="TEST Description"
    iOS=iOS
    appIdIOS=appIdIOS
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--description').text(), 'TEST Description', 'The description is set correctly.');
});

test('is can set linkText through template', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    linkText="TEST Link"
    iOS=iOS
    appIdIOS=appIdIOS
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--view-button').text().trim(), 'TEST Link', 'The link text is set correctly.');
});

test('is can set iconUrl through template', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('appStoreLanguage', 'en');

  this.render(hbs`{{smart-banner
    iconUrl="https://www.example.com/"
    iOS=iOS
    appIdIOS=appIdIOS
    appStoreLanguage=appStoreLanguage
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--icon').attr('style'), 'background-image: url(https://www.example.com/)');
});

test('should successfully record click of close button ', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  assert.notOk(localStorage.getItem('ember-smart-banner.lastDayClosed'), 'click of close button is not present before render/click');

  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  // Click close button and assert that lastDayClosed is stored;
  const smartBanner = this.$();
  smartBanner.find('.ember-smart-banner--close-button').click();
  assert.ok(localStorage.getItem('ember-smart-banner.lastDayClosed'), 'click of close button is stored correctly');
});

test('should successfully record click of link', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  assert.notOk(localStorage.getItem('ember-smart-banner.lastDayVisited'), 'click of link is not present before render/click');

  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
  }}`);

  // Click close button and assert that lastDayClosed is stored;
  const smartBanner = this.$();
  smartBanner.find('.ember-smart-banner--view-button').click();
  assert.ok(localStorage.getItem('ember-smart-banner.lastDayVisited'), 'click of link is stored correctly');
});

test('banner should be open if number of days since the banner was closed is equal to the set postpone', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 30; // 30 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 30 days from today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));

  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=30
  }}`);
  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
});

test('banner should be open if number of days since the banner was closed is greater than the set postpone', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 31; // 31 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 31 days from today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=30
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
});

test('banner should be closed if number of days since the banner was closed is less than set postpone', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 29; // 29 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 30 days from today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=30
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');
});

test('banner should be open in complex scenario', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 60; // 60 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 60 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  dateOffset = (24 * 60 * 60 * 1000) * 45; // 45 days
  newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 45 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=30
    postponeAfterVisit=30
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
});

test('banner should be closed in complex scenario', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 35; // 35 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 35 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  dateOffset = (24 * 60 * 60 * 1000) * 25; // 25 days
  newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 25 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=30
    postponeAfterVisit=30
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');
});

test('set postponeafterClose to true will make the banner default to open', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  this.set('postponeAfterClose', '30');
  this.set('postponeAfterVisit', '30');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 35; // 35 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 35 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  dateOffset = (24 * 60 * 60 * 1000) * 25; // 25 days
  newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 25 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=postponeAfterClose
    postponeAfterVisit=postponeAfterVisit
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');
  this.set('postponeAfterClose', true);
  // Assert that banner will be open unless the duration of the postponeAfterVisit is greater than the daysSinceClose
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is still closed');
  this.set('postponeAfterVisit', 25);
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
});

test('set postponeafterVisit to true will make the banner default to open', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  this.set('postponeAfterClose', '30');
  this.set('postponeAfterVisit', '30');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 35; // 35 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 35 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  dateOffset = (24 * 60 * 60 * 1000) * 25; // 25 days
  newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 25 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=postponeAfterClose
    postponeAfterVisit=postponeAfterVisit
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');
  this.set('postponeAfterVisit', true);
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
});

test('set postponeafterClose to false will make the banner default to close', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  this.set('postponeAfterClose', '30');
  this.set('postponeAfterVisit', '30');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 35; // 35 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 35 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=postponeAfterClose
    postponeAfterVisit=postponeAfterVisit
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
  this.set('postponeAfterClose', false);
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');

});

test('set afterVisitpostpone to false will make the banner default to close', function(assert) {
  this.set('iOS', true);
  this.set('appIdIOS', 123);
  this.set('android', false);
  this.set('appIdAndroid', null);
  this.set('appStoreLanguage', 'en');
  this.set('postponeAfterClose', '30');
  this.set('postponeAfterVisit', '30');
  localStorage.clear();
  var dateOffset = (24 * 60 * 60 * 1000) * 35; // 35 days
  var newDate = new Date(); // today
  newDate.setTime(newDate.getTime() - dateOffset); //newDate set to 35 days prior to today
  localStorage.setItem('ember-smart-banner.lastDayClosed', JSON.stringify(newDate));
  localStorage.setItem('ember-smart-banner.lastDayVisited', JSON.stringify(newDate));
  this.render(hbs `{{smart-banner
    iOS=iOS
    appIdIOS=appIdIOS
    android=android
    appIdAndroid=appIdAndroid
    appStoreLanguage=appStoreLanguage
    postponeAfterClose=postponeAfterClose
    postponeAfterVisit=postponeAfterVisit
  }}`);

  const smartBanner = this.$();
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 1, 'banner is open');
  this.set('postponeAfterVisit', false);
  assert.equal(smartBanner.find('.ember-smart-banner--inner').length, 0, 'banner is closed');
});
