# ember-smart-banner
----
ember-smart-banner is an addon that can be installed with Ember CLI.  The addon provides a simple configurable Smart Banner that can be used in your Ember.js application.

----
## Installation
    $ cd your-project-directory
    $ ember install ember-smart-banner

----
## Usage
You can place the component directly in ```application.hbs``` file in order for component to be rendered by default when your application starts

    //your-ember-app/app/templates/application.hbs
    {{smart-banner}}
    {{outlet}}

Banner Defaults:

    appStoreLinkBase: 'https://itunes.apple.com'
    appStoreLanguage: 'en'
    appIdIOS: '123',
    marketLinkBase: 'market://details?id=',
    appIdAndroid: '123',
    title: 'App Name',
    description: 'Company Name, Inc.',
    linkText: 'View',
    link: 'https://itunes.apple.com',
    iconUrl: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png'

Banner can be configured through ```config/environment.js```

    module.exports = function(environment) {
      var ENV = {

        ...

        emberSmartBanner: {
            title: 'App Title',
           description: 'Description',
          linkText: 'View',
          appIdIOS: '123',
          appStoreLanguage: 'en',
          iconUrl: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png'
        }

        ...



----
## Features
* Shows iOS 7 banner design
* Detects iOS or Android and provides appropriate link
* Only shown when using Mobile Safari since that's the only browser with home screen integration.
* Set number of days before the banner is shown again after it's closed & after the visitor clicks "View" button
* Option to set number of days before the banner is shown again to 'false' to never show banner again after the visitor clicks "View" button
* Flexible configuration allows you to always show banner regardless of operating system

----
##Roadmap
* Automatic icon detection
* Refactor tests to use utils
* Mozilla local-forage implementation
* Windows support
