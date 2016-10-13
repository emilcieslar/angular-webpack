export default ngModule => {

    class DetailsFormCtrl {

        constructor(WeatherService) {

            this.formData = {
                zipcode: '',
                countryCode: '',
            }

            this.geolocationEnabled = () => WeatherService.getWeatherData().geolocationEnabled;

        }

        getWeatherManually() {
            console.log('getting weather..');
        }

    };

    const detailsForm = {

        template: require('./details-form.html'),

        controller: DetailsFormCtrl

    }

    ngModule.component('detailsForm', detailsForm);

}
