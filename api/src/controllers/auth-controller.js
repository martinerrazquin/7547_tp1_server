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
}

AuthController.register = async(req, res, next) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }

  try {
    req.body.facebookId = req.user.facebookId;
    req.body.facebookToken = req.user.facebookToken;
    var user = await UserService.create(req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

AuthController.getProfile = async(req, res, next) => {
  if (!req.user) {
    return res.status(401).send();
  }
  res.json(req.user);
};


module.exports = AuthController;
