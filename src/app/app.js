// Import JS dependencies
import angular from 'angular';
import geolocation from 'angularjs-geolocation';

// Import generic styling
import '../scss/app.scss';

/**
 * Application Main Controller
 */
class AppCtrl {

    constructor(geolocation, WeatherService) {

        geolocation.getLocation().then(

            function fulfilled(data) {
                WeatherService.getWeather(data.coords);
                console.log('first');
            },

            function rejected(error) {
                WeatherService.disableGeolocation();
                console.log('second');
            }

        );

    }

}

/**
 * Application Main Component
 * This wraps around the whole app
 */
const AppComponent = {

    template: require('./app.html'),

    controller: AppCtrl

}

/** Instantiate the angular module and add the main component */
const weatherAppModule = angular.module('weatherApp', ['geolocation'])
    .component('app', AppComponent);

// Require other components
require('./components').default(weatherAppModule);
