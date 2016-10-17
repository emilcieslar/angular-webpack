export default ngModule => {

    class WeatherCtrl {

        constructor(WeatherService) {

            this.weatherData = WeatherService.getWeatherData();

        }

    }

    const weatherComponent = {

        template: require('./weather.html'),

        controller: WeatherCtrl

    }

    ngModule.component('weather', weatherComponent);

}
