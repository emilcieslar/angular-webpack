export default ngModule => {

    class WeatherCtrl {

        constructor() {

        }

    }

    const weatherComponent = {

        template: require('./weather.html'),

        controller: WeatherCtrl

    }

    ngModule.component('weather', weatherComponent);

}
