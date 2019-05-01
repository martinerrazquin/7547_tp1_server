'use strict';

var { passport, jwt } = require('../config/dependencies');
var { UserService } = require('../services');

var Auth = {};

Auth.name = 'auth';

Auth._getFromRequest = async(req) => {
  var user;
  try {
    var decoded = jwt.verify(req.headers['x-auth-token'], 'my-secret');
    user = await UserService.getById(decoded.id);
  } catch (err) {
    user = null;
  }
  return user;
};

Auth.authenticate = async(req, res, next) => {
  try {
    req.user = await Auth._getFromRequest(req);
  } catch (e) {
    console.log(e);
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
      return res.send(403, 'User not Registered');
    }

    if (!req.user.hasRole(role)) {
      return res.send(401, 'Missing Permissions');
    }

    next();
  };
};

module.exports = Auth;
