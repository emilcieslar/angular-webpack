describe('AppCtrl', () => {

    /** Define global vars that will be used in tests */
    let $componentController,
        WeatherService,
        geolocation,
        $rootScope,
        $q;

    beforeEach(() => {

        // Set up our module
        angular.mock.module('weatherApp');

        // Inject and assign dependencies that we'll need for each test
        angular.mock.inject((_$componentController_, _geolocation_, _$q_, _$rootScope_, _WeatherService_) => {

            $componentController = _$componentController_;
            WeatherService = _WeatherService_;
            geolocation = _geolocation_;
            $q = _$q_;
            $rootScope = _$rootScope_;

            // Spy on the following two methods (in test we're gonna check if they were called)
            spyOn(WeatherService, 'getWeather');
            spyOn(WeatherService, 'disableGeolocation');

        });

    });

    it('should fetch weather when user allows geolocation', () => {

        // Set up spy on geolocation and call fake method with a fulfilled promise
        // which is gonna fake when user allows HTML5 geolocation and it's been successful
        spyOn(geolocation, 'getLocation').and.callFake(() => {
            var deferred = $q.defer();
            deferred.resolve({
                coords: {
                    'latitude': 0,
                    'longitude': 0
                }
            });
            return deferred.promise;
        });

        // Instantiate the controller
        const ctrl = $componentController('app', {});
        // We have to call $apply, otherwise promise won't be resolved completely
        $rootScope.$apply();

        expect(WeatherService.getWeather).toHaveBeenCalled();

    });

    it('should allow user to provide weather manually by calling disableGeolocation on WeatherSerivce when user disallows geolocation', () => {

        // Set up spy on geolocation and call fake method with a rejected promise
        // which is gonna fake when user disables HTML5 geolocation
        spyOn(geolocation, 'getLocation').and.callFake(() => {
            var deferred = $q.defer();
            deferred.reject({
                error: true
            });
            return deferred.promise;
        });

        // Instantiate the controller
        const ctrl = $componentController('app', {});
        // We have to call $apply, otherwise promise won't be resolved completely
        $rootScope.$apply();

        expect(WeatherService.disableGeolocation).toHaveBeenCalled();

    });


});
