'use strict';

var { DriverService } = require('../services');
var { moment } = require('../config/dependencies');

var DriverController = {};

DriverController.name = 'DriverController';

DriverController.summary = async(req, res, next) => {
    try {
        const results = await DriverService.getSummaryForDriver(1);
        const summary = buildSummary(results);
        res.json(summary);
    } catch (err) {
        next(err);
    }
};

function buildSummary(results) {
    var summary = {
        current: {
            trips: 0,
            money: 0,
        },
        previous: {
            trips: 0,
            money: 0,
        }
    };
    const currentMonth = moment().format('YYYY-MM');
    const previousMonth = moment().subtract(1, 'months').format('YYYY-MM');

    results.forEach(function (element) {
        const monthSummary = {
            trips: element.total_trips,
            money: element.total_money
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

module.exports = DriverController;