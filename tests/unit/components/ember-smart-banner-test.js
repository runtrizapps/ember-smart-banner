import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-smart-banner', 'Unit | Component | ember smart banner', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {

  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.equal(this.$().text().trim(), '');
});

// TODO - unit tests
//  test store link building?
//  gather a few test UserAgent strings and test detection?
//  perhaps test the result of title/description based on platform
