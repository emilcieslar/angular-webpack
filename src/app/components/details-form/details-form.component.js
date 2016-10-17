export default ngModule => {

    class DetailsFormCtrl {

        constructor(WeatherService) {

            this.formData = {
                zip: '',
                country: '',
            }

            // Hide the details form when:
            // - Weather data are available
            // Show the details form when:
            // - User or system disabled geolocation, but weather data are still not available
            this.hideWeatherForm = () => WeatherService.getWeatherData().weather || WeatherService.getWeatherData().geolocationEnabled;

            this.WeatherService = WeatherService;

        }

        getWeatherManually() {
            this.WeatherService.getWeather(this.formData);
        }

    };

    const detailsForm = {

        template: require('./details-form.html'),

        controller: DetailsFormCtrl

    }

    ngModule.component('detailsForm', detailsForm);

}
