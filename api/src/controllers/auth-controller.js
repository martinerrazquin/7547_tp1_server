'use strict';

var { UserService } = require('../services');
var { jwt } = require('../config/dependencies');

var AuthController = {};

AuthController.name = 'AuthController';

AuthController.login = async(req, res) => {
  if (!req.user || !req.user.id) {
    return res.send(403, 'User not Registered');
  }

  var token = jwt.sign({
    id: req.user.id,
  }, 'my-secret', {
    expiresIn: 60 * 120,
  });

  res.setHeader('x-auth-token', token);
  res.json(req.user);
};

var invalidBodyForType = (body, type) => {
  var invalidClientBody = type === 'client' && body.driverData;
  var invalidDriverBody = type === 'driver' && !body.driverData;
  return invalidClientBody || invalidDriverBody;
};

AuthController.register = (type) => {
  return async(req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    if (invalidBodyForType(req.body, type)) {
      return res.status(400).json({
        type: 'validationError',
        errors: [
          {
            error: type === 'driver' ?
              'isBlank' : 'shouldNotExist', path: 'driverData',
          },
        ],
      });
    }

    try {
      req.body.facebookId = req.user.facebookId;
      req.body.facebookToken = req.user.facebookToken;
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
  if (!req.user) {
    return res.status(401).send();
  }
  res.json(req.user);
};


module.exports = AuthController;
