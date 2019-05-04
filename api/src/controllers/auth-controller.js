'use strict';

var { UserService } = require('../services');

var AuthController = {};

AuthController.name = 'AuthController';

var invalidUserForType = (user, type) => {
  var invalidClient = type === 'client' && user.driverData;
  var invalidDriver = type === 'driver' && !user.driverData;
  return invalidClient || invalidDriver;
};

AuthController.register = (type) => {
  return async(req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    } else if (req.user.id) {
      return res.send(403, 'User Already Registered');
    }

    if (invalidUserForType(req.body, type)) {
      return res.status(400).json({
        type: 'validationError',
        errors: [
          {
            error: type === 'driver' ? 'isBlank' : 'shouldNotExist',
            path: 'driverData',
          },
        ],
      });
    }

    try {
      req.body.facebookId = req.user.facebookId;
      var user;
      if (type === 'driver') {
        user = await UserService.createDriver(req.body);
      } else {
        user = await UserService.createClient(req.body);
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  };
};

AuthController.getProfile = async(req, res, next) => {
  res.json(req.user);
};


module.exports = AuthController;
