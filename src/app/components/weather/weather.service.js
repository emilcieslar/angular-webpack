export default ngModule => {

    require('./weather.constant').default(ngModule);

    /** Class representing a WeatherService that allows user to fetch weather */
    class WeatherService {

        /**
         * Set up WeatherService
         * @param {Object} $http
         * @param {Object} WEATHER_CONFIG
         */
        constructor($http, WEATHER_CONFIG, ecCalloutService) {

            /**
             * @typedef {Object} weatherData
             * @property {boolean} geolocationEnabled Whether the geo loc is enabled or not
             * @property {string} name Location name
             * @property {Object} main Object containing data about weather, such as pressure, humidity and temp
             * @property {Array} weather Containing objects with data related to the weather icon displayed
             */
            this.weatherData = {
                geolocationEnabled: true
            }

            this.$http = $http;
            this.WEATHER_CONFIG = WEATHER_CONFIG;
            this.CalloutService = ecCalloutService;
        }

        /**
         * @returns {weatherData} Object containing weather data
         */
        getWeatherData() {
            return this.weatherData;
        }

        /**
         * Sets weather data
         * @param {weatherData} weatherData Object containing weather data
         */
        setWeatherData(weatherData) {
            // Assign properties from response.data to weatherData
            for(var key in weatherData) this.weatherData[key] = weatherData[key];
        }

        /**
         * Gets weather using provided params
         * @param {Object} params The parameters provided by a user
         * @param {string} params.latitude
         * @param {string} params.longitude
         * @param {string} params.zip The city ZIP code
         * @param {string} params.country The country code (CZ, GB, ...)
         */
        getWeather(params) {

            return this.$http({

                method: 'GET',
                url: this.WEATHER_CONFIG.API_URL,
                params: {
                    lat: params.latitude,
                    lon: params.longitude,
                    // zip must be in format: zip,countryCode
                    zip: params.zip && params.country ? params.zip.toLowerCase().replace(/\s/g, "") + ',' + params.country.toLowerCase().replace(/\s/g, "")  : '',
                    units: 'metric',
                    APPID: this.WEATHER_CONFIG.APP_ID
                }

            }).then(

                function fulfilled(response) {

                    console.log(response.data);

                    // Check for response.data.cod property
                    // If it's not 200, the response is not successful
                    // This happens when API's response status is 200 (which is basically
                    // success and therefore handled here), yet the API responded
                    // with data containing cod: "404", which is an error
                    if(response.data.cod != 200) {

                        // Disable geolocation in order for the manual form to be displayed
                        this.disableGeolocation();

                        // Send notification about failure
                        this.CalloutService.notify({
                            type: 'alert',
                            message: response.data.message,
                            img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg',
                            timeout: 4000
                        });

                    // Otherwise, if it's cod: "200", we have successful response and can handle the data
                    } else {

                        // Assign properties from response.data to weatherData
                        this.setWeatherData(response.data);

                        // Send a notification about success
                        this.CalloutService.notify({
                            type: 'success',
                            message: 'Weather data successfully fetched',
                            img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg',
                            timeout: 2000
                        });

                    }


                }.bind(this),

                /**
                 * If there was an error during the process, log it
                 */
                function rejected(error) {
                    console.error(error);
                }

            );

        }

        disableGeolocation(error = 'There was an error while retrieving your location, please provide details to display weather') {
            this.weatherData.geolocationEnabled = false;

            // Notify
            this.CalloutService.notify({
                type: 'alert',
                message: error,
                img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg',
                timeout: 4000
            });
        }

    };

    ngModule.service('WeatherService', WeatherService);

}
