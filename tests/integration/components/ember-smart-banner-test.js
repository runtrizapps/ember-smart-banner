import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-smart-banner', 'Integration | Component | ember smart banner', {
  integration: true
});

test('it renders', function(assert) { // TODO - make this more real
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-smart-banner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-smart-banner}}
      template block text
    {{/ember-smart-banner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});


test('it does not render on iOS unless an appId is set', function(assert) {
  this.set('iOS', true);
  this.set('iosAppId', 123);
  this.set('android', false);
  this.set('androidAppId', null);

  this.render(hbs`{{ember-smart-banner
    iOS=iOS
    iOSAppId=iOSAppId
    android=android
    androidAppId=androidAppId
  }}`);

  // TODO Assert that it renders with appStore link

  this.set('iosAppId', null);

  // TODO Assert that it is no longer shown

});

test('it does not render on iOS unless iOS platform detected', function(assert) {
  this.set('iOS', true);
  this.set('iosAppId', 123);
  this.set('android', false);
  this.set('androidAppId', null);

  this.render(hbs`{{ember-smart-banner
    iOS=iOS
    iOSAppId=iOSAppId
    android=android
    androidAppId=androidAppId
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

  this.render(hbs`{{ember-smart-banner
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

  this.render(hbs`{{ember-smart-banner
    iOS=iOS
    iOSAppId=iOSAppId
    android=android
    androidAppId=androidAppId
  }}`);

  // TODO Assert that it renders with appStore link

  this.set('android', false);

  // TODO Assert that it is no longer shown
});
