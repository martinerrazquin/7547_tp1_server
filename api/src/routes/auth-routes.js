'use strict';

var { auth } = require('../middleware');
var { AuthController } = require('../controllers');

module.exports = (app) => {

  app.route('/auth/client/facebook/login')
    .post(
      auth.facebookAuthenticate,
      auth.authorize('client'),
      auth.validateEnabledClient,
      (req, res, next) => {
        res.json(req.user);
      }
    );

  app.route('/auth/driver/facebook/login')
    .post(
      auth.facebookAuthenticate,
      auth.authorize('driver'),
      (req, res, next) => {
        res.json(req.user);
      }
    );

  app.route('/auth/client/facebook/register')
    .post(
      auth.facebookAuthenticate,
      AuthController.register('client')
    );

  app.route('/auth/driver/facebook/register')
    .post(
      auth.facebookAuthenticate,
      AuthController.register('driver')
    );

  app.route('/auth/me')
    .get(
      auth.facebookAuthenticate,
      auth.authorize(),
      AuthController.getProfile
    );
};
