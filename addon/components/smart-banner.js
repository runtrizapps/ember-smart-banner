import Ember from 'ember';

export default Ember.Component.extend({
  show: true,
  classNameBindings: ['smart-banner'],
  title: '',
  description: '',
  buttonText: '',
  imgUrl: '',
  bannerState: 'idle',
  isLoading: computed.equal('bannerState', 'loading'),
});
