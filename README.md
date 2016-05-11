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

Set title, description, link test, and url for icon through template

    {{smart-banner
        appIdIOS=12335
        appIdAndroid=56789
        appStoreLanguage=fr // set to french ISO 639-1 code
        openAfterClose=30 // show close button 30 days after
        openAfterVisit=false // never show again after click
    }}
----
## Features
* Shows iOS 7 banner design
* Detects iOS or Android platform and provides appropriate link
* Only shown when using Mobile Safari since that's the only browser with home screen integration.
* Set number of days before the banner is shown again after it's closed and/or after the visitor clicks "View" button
* Option to set number of days before the banner is shown again to 'false' to never show banner again after the visitor clicks "View" button
* Flexible configuration allows you to always show banner regardless of operating system
* It will not render on iOS or Android unless their respective appId is set
* Set title, description, link test, and url for icon through template
* Configure parameters in your application's environment using the default environment config file at ```config/environment```
* Render defaults if no parameters are set
* Set duration to postpone showing the banner again after it's closed and/or after the visitor clicks "View" button

    ```showAfterClose=3 // show 3 days after banner it closed```
    ```showAfterVisit=30 // show 30 days after clicking visit link```

* Set banner to default to open or default to close next time the user starts the application

    ```showAfterClose=true // never show again after clicking visit```
    ```showAfterVisit=true // never show again after clicking visit```
    ```showAfterClose=false // never show again after clicking visit```
    ```showAfterVisit=false  // never show again after clicking visit```

----

* Thorough integration tests

----
##Roadmap
* Automatic icon detection
* Refactor tests to use utils
* Mozilla local-forage implementation
* Windows support
