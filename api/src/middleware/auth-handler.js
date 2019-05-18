'use strict';

var { passport } = require('../config/dependencies');
var { UserService } = require('../services');
var Auth = {};

Auth.name = 'auth';

Auth._facebookAuth = passport.authenticate(
  'facebook-token',
  {session: false}
);

Auth.facebookAuthenticate = (req, res, next) => {
  Auth._facebookAuth(req, res, next);
};

Auth._authenticate = async(req, res, next) => {
  try {
    var token = req.headers.authorization.slice(7);
    req.user = await UserService.getByFacebookToken(token, 'withDriverId');
    if (!req.user) {
      return res.status(401).send('Invalid Credentials');
    }
    next(null);
  } catch (err) {
    next(err);
  }
};

Auth.authenticate = (req, res, next) => {
  Auth._authenticate(req, res, next);
};

Auth.authorize = (role) => {
  return async(req, res, next) => {
    if (!req.user || !req.user.id) {
      return res.status(403).send('User not Registered');
    }

    if (role && !req.user.hasRole(role)) {
      return res.status(401).send('Missing Permissions');
    }

    next();
  };
};

module.exports = Auth;
