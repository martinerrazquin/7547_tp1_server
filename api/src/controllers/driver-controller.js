'use strict';

var { DriverService } = require('../services');
var { moment } = require('../config/dependencies');

var DriverController = {};

DriverController.name = 'DriverController';

DriverController.summary = async(req, res, next) => {
  try {
    const driverId = req.user.driverData.id;
    const results = await DriverService.getSummaryForDriver(driverId);
    const summary = buildSummary(results);
    res.json(summary);
  } catch (err) {
    next(err);
  }
};

function buildSummary(results) {
  var summary = {
    current: {
      trips: '0',
      money: '0',
    },
    previous: {
      trips: '0',
      money: '0',
    },
  };
  const currentMonth = moment().format('YYYY-MM');
  const previousMonth = moment().subtract(1, 'months').format('YYYY-MM');

  results.forEach(function(element) {
    const monthSummary = {
      trips: element.total_trips,
      money: element.total_money,
    };

    if (element.month === currentMonth){
      summary.current = monthSummary;
    }
    if (element.month === previousMonth){
      summary.previous = monthSummary;
    }
  });
  return summary;
}

DriverController.updateEnabledState = async(req, res, next) => {
  try {
    var result = await DriverService.update(req.params.driverId, {
      enabledToDrive: req.body.enabled,
    });
    if (!result) {
      return res.status(404).send('Not found');
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = DriverController;
