'use strict';

var { passport } = require('../config/dependencies');

var Auth = {};

Auth.name = 'auth';

Auth._facebookAuth = passport.authenticate(
  'facebook-token',
  {session: false}
);

Auth.facebookAuthenticate = (req, res, next) => {
  Auth._facebookAuth(req, res, next);
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
