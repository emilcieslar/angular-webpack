# Weather Task

Weather App is created using Angular 1.x, ES6. Bundled up with Webpack. Testing done with Karma + Jasmine.

## Example

You can find example at [weather.emmil.cz](https://weather.emmil.cz).

## Notes

* HTML5 geolocation API is allowed only on HTTPS domains, therefore I had to activate SSL certificate to make it work. This, however, introduced a problem with openweathermap which doesn't support HTTPS calls using FREE plan. I had to create *middle man* using simple PHP script that serves the API request for the openweathermap on [weatherapi.emmil.cz](https://weatherapi.emmil.cz) and returns JSON with the requested data.

* The project uses forked code from [Angular Webpack](https://github.com/preboot/angular-webpack) project which sets up webpack and karma config to work with Angular, Webpack and Karma + Jasmine

* The project SCSS follows modified BEM methodology introduced by [Harry Roberts](http://csswizardry.com/).

* The project uses some parts of [Harry Roberts' Inuitcss framework](https://github.com/inuitcss/inuitcss).


## Quick start

>Warning: Make sure you're using the latest version of Node.js and NPM

```bash
# clone the project
$ clone https://github.com/emilcieslar/compucorp-weather.git

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

Go to [http://localhost:8080](http://localhost:8080) in your browser. `npm start` will watch files and keep them in memory (it won't build them to dist folder).

## Build files to dist folder

* single run: `npm run build`
* build files and watch: `npm run watch`

## Testing

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

# License

[MIT](/LICENSE)
