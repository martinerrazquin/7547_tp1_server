'use strict';

var { passport, jwt } = require('../config/dependencies');
var { UserService } = require('../services');

var Auth = {};

Auth.name = 'auth';

Auth.authenticate = async(req, res, next) => {
  try {
    var decoded = jwt.verify(req.headers['x-auth-token'], 'my-secret');
    req.user = await UserService.getById(decoded.id, 'withDriverId');
  } catch (err) {
    req.user = null;
  }
  next();
};

Auth.facebookAuthenticate = passport.authenticate(
  'facebook-token',
  {session: false}
);

Auth.authorizeAs = (role) => {
  return async(req, res, next) => {
    if (!req.user || !req.user.id) {
      return res.status(403).send('User not Registered');
    }

    if (!req.user.hasRole(role)) {
      return res.status(401).send('Missing Permissions');
    }

    next();
  };
};

module.exports = Auth;
