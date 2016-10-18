export default ngModule => {

    const WEATHER = {
        API_URL: 'https://weatherapi.emmil.cz/',
        APP_ID: 'a5406db6084c9bf40b2b1196b196e199'
    }

    ngModule.constant('WEATHER_CONFIG', WEATHER);

}
