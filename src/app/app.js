// Import JS dependencies
import angular from 'angular';
import geolocation from 'angularjs-geolocation';
import ngAnimate from 'angular-animate';
import angularEcCallout from 'angular-ec-callout';

// Import styling
import '../scss/main.scss';

/**
 * Application Main Controller
 */
class AppCtrl {

    constructor(geolocation, WeatherService) {

        // Try to get user's geolocation using HTML5 geolocation
        geolocation.getLocation().then(

            /**
             * In case user allows geoloc and it succeeeds finding the
             * locadtion, get weather data immediately
             */
            function fulfilled(data) {
                WeatherService.getWeather(data.coords);
            },

            /**
             * In case user disables geolocation or it won't succeed
             * finding location, let WeatherService know that geolocation
             * is disabled
             */
            function rejected(error) {
                WeatherService.disableGeolocation(error);
            }

        );

    }

}

AppCtrl.$inject = ['geolocation', 'WeatherService'];


/**
 * Application Main Component
 * This wraps around the whole app
 */
const AppComponent = {

    template: require('./app.html'),

    controller: AppCtrl

}

/** Instantiate the angular module and add the main component */
const weatherAppModule = angular.module('weatherApp', ['geolocation', 'angular-ec-callout', 'ngAnimate'])
    .component('app', AppComponent);

// Require other components
require('./components').default(weatherAppModule);
