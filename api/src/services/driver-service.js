'use strict';

var { Driver } = require('../models');

var DriverService = {};

DriverService.name = 'DriverService';


DriverService.getById = async(driverId) => {
  return await Driver.findByPk(driverId);
};


module.exports = DriverService;
