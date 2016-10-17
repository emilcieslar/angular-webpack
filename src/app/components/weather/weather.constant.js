export default ngModule => {

    const WEATHER = {
        API_URL: '//api.openweathermap.org/data/2.5/weather',
        APP_ID: 'a5406db6084c9bf40b2b1196b196e199'
    }

    ngModule.constant('WEATHER_CONFIG', WEATHER);
    
}
