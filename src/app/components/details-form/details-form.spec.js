describe('DetailsFormCtrl', () => {

    /** Define global vars that will be used in tests */
    let $componentController,
        WeatherService;

    beforeEach(() => {

        // Set up our module
        angular.mock.module('weatherApp');

        // Inject and assign dependencies that we'll need for each test
        angular.mock.inject((_$componentController_, _WeatherService_) => {

            $componentController = _$componentController_;
            WeatherService = _WeatherService_;

        });

    });

    it('should hide form when weather is available', () => {

        // Object containing sample weather data need to display weather
        const weatherData = {
            "weather": [
                {
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                }
            ],
            "main": {
                "temp":8.57,
                "pressure":997.13,
                "humidity":100
            },
            "clouds": {
                "all":56
            },
            "wind": {
                "speed":1.66
            },
            "name": "Nydek"
        }

        WeatherService.setWeatherData(weatherData);

        // Instantiate the controller
        const ctrl = $componentController('detailsForm', {});

        expect(ctrl.hideWeatherForm()).toBeTruthy();

    });

    it('should show form when geolocation is not enabled (either by user or system error)', () => {

        WeatherService.disableGeolocation();

        // Instantiate the controller
        const ctrl = $componentController('detailsForm', {});

        expect(ctrl.hideWeatherForm()).toBeFalsy();

    });

    it('should hide form when weather is available, even though geolocation is disabled', () => {

        // Object containing sample weather data need to display weather
        const weatherData = {
            "weather": [
                {
                    "main":"Clouds",
                    "description":"broken clouds",
                    "icon":"04d"
                }
            ],
            "main": {
                "temp":8.57,
                "pressure":997.13,
                "humidity":100
            },
            "clouds": {
                "all":56
            },
            "wind": {
                "speed":1.66
            },
            "name": "Nydek"
        }

        // Set the data
        WeatherService.setWeatherData(weatherData);
        // And disable geolocation
        WeatherService.disableGeolocation();

        // Instantiate the controller
        const ctrl = $componentController('detailsForm', {});

        expect(ctrl.hideWeatherForm()).toBeTruthy();

    });

});
