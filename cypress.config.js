const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //defaultCommandTimeout: 10000, 
  video: false,
  e2e: {
    specPattern: 'cypress/integration/**/*.spec.js',
    baseUrl: 'https://barrigarest.wcaquino.me',

    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      //return require('./cypress/plugins/index.js')(on, config)
    },
  },
})


