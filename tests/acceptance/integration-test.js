import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Integration', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('banner is rendered', function(assert) {
  // assert.expect(7);
  visit('/');

  andThen(() => {
    assert.ok(find('.ember-smart-banner'));
    // assert.equal(find('.ember-smart-banner').attr('style'),
    //   `position: fixed;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 125px;`);
    // assert.equal(find('.ember-smart-banner--title').text(), 'App Title');
    // assert.equal(find('.ember-smart-banner--description').text(), 'Description');
    // assert.equal(find('.ember-smart-banner--link').text(), 'Link Text');
  });
});
