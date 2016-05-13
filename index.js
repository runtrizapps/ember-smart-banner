/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-smart-banner',
  included: function(app) {
    // https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._super.included(app);

    app.import('vendor/smart-banner.css');
  }
};
