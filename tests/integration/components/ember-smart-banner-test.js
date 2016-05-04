import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('smart-banner', 'Integration | Component | ember smart banner', {
  integration: true
});

test('it renders', function(assert) { // TODO - make this more real
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{smart-banner}}`);
  assert.ok(this.$().text().trim().match(/App Title/));
});


test('it does not render on iOS unless an appId is set', function(assert) {
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
  // TODO Assert that it renders with appStore link
  assert.equal(this.$('.ember-smart-banner--link').attr('href'), 'https://itunes.apple.com/en/app/123');
  //
  // this.set('iosAppId', null);
  //
  // // TODO Assert that it is no longer shown

});

test('it does not render on iOS unless iOS platform detected', function(assert) {
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

  // TODO Assert that it renders with appStore link

  this.set('iOS', false);

  // TODO Assert that it is no longer shown
});

test('it does not render on Android unless appId is set', function(assert) {
  this.set('iOS', false);
  this.set('iosAppId', null);
  this.set('android', true);
  this.set('androidAppId', 123);

  this.render(hbs`{{smart-banner
    iOS=iOS
    iOSAppId=iOSAppId
    android=android
    androidAppId=androidAppId
  }}`);

  // TODO Assert that it renders with appStore link

  this.set('androidAppId', null);

  // TODO Assert that it is no longer shown
});

test('it does not render on Android unless Android platform detected', function(assert) {
  this.set('iOS', false);
  this.set('iosAppId', null);
  this.set('android', true);
  this.set('androidAppId', 123);

  this.render(hbs`{{smart-banner
    iOS=iOS
    iOSAppId=iOSAppId
    android=android
    androidAppId=androidAppId
  }}`);

  // TODO Assert that it renders with appStore link

  this.set('android', false);

  // TODO Assert that it is no longer shown
});
