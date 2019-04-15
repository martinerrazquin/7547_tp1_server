'use strict';

var { passport, jwt } = require('../config/dependencies');
var { UserService } = require('../services');

var Auth = {};

Auth.name = 'auth';

Auth.authenticate = async(req, res, next) => {
  try {
    var decoded = jwt.verify(req.headers['x-auth-token'], 'my-secret');
    req.user = await UserService.getById(decoded.id);
  } catch (err) {
    req.user = null;
  }
  next();
};

Auth.facebookAuthenticate = passport.authenticate(
  'facebook-token',
  {session: false}
);

module.exports = Auth;
