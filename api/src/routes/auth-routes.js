'use strict';

var { auth } = require('../middleware');
var { AuthController } = require('../controllers');

module.exports = (app) => {
  app.route('/auth/client/facebook/login')
    .post(
      auth.facebookAuthenticate,
      auth.authorizeAs('client'),
      AuthController.login('client')
    );

  app.route('/auth/driver/facebook/login')
    .post(
      auth.facebookAuthenticate,
      auth.authorizeAs('driver'),
      AuthController.login('driver')
    );

  app.route('/auth/client/facebook/register')
    .post(auth.facebookAuthenticate, AuthController.register('client'));

  app.route('/auth/driver/facebook/register')
    .post(auth.facebookAuthenticate, AuthController.register('driver'));

  app.route('/auth/me')
    .get(AuthController.getProfile);
};
