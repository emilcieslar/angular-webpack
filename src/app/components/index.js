export default ngModule => {

    // Details Form
    require('./details-form/details-form.component').default(ngModule);

    // Weather
    require('./weather/weather.component').default(ngModule);
    require('./weather/weather.service').default(ngModule);
}
