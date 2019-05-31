'use strict';

var DriverController = {};

DriverController.name = 'DriverController';

DriverController.summary = async(req, res, next) => {
    try {
        const summary = {
            current: {
                trips: 15,
                money: 2114,
            },
            previous: {
                trips: 165,
                money: 20398,
            }
        };
        res.json(summary);
    } catch (err) {
        next(err);
    }
};

module.exports = DriverController;
