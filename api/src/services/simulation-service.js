'use strict';

var DriverService = require('./driver-service');

var SimulationService = {};

SimulationService.name = 'SimulationService';

var sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

SimulationService.startSimulation = async(driver, route) => {
  if (!route || !route.routes
    || !route.routes[0]
    || !route.routes[0].legs
    || !route.routes[0].legs[0]) {
    return;
  }

  var currentIndex = 0;
  while (currentIndex < route.routes[0].legs[0].steps.length) {
    console.log('I\'m updating!');
    driver.currentLocation =
      route.routes[0].legs[0].steps[currentIndex].end_location;
    driver = await DriverService.update(driver.id, driver);
    await sleep(4000);
    currentIndex++;
  }
};

module.exports = SimulationService;
