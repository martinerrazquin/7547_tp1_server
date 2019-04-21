'use strict';

var { auth } = require('../middleware');
var { AuthController } = require('../controllers');

module.exports = (app) => {
  app.route('/auth/client/facebook/login')
    .post(auth.facebookAuthenticate, AuthController.login);

  app.route('/auth/client/facebook/register')
    .post(auth.facebookAuthenticate, AuthController.register);

  app.route('/auth/client/facebook/register')
    .post(auth.facebookAuthenticate, AuthController.register);

  app.route('/auth/me')
    .get(AuthController.getProfile);
};
