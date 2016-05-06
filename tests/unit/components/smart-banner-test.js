import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('smart-banner', 'Unit | Component | smart banner', {
  // Specify the other units that are required for this test
  needs: ['config:environment'],
  unit: true
});

test('it renders', function(assert) {

  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.equal(this.$().text().trim(), '');
});
