export default ngModule => {

    class WeatherService {

        constructor($http, $q) {

            this.weatherData = {
                geolocationEnabled: true
            }

            this.$http = $http;
            this.$q = $q;

        }

        getWeatherData() {
            return this.weatherData;
        }

        getWeather(params) {



        }

        disableGeolocation() {
            this.weatherData.geolocationEnabled = false;
        }

    };

    ngModule.service('WeatherService', WeatherService);

}
