'use strict';

var { UserService } = require('../services');
var { jwt } = require('../config/dependencies');
var { auth } = require('../middleware');

module.exports = (app) => {
  app.route('/auth/facebook/login')
    .post(auth.facebookAuthenticate, (req, res) => {
      if (!req.user || !req.user.id) {
        return res.send(401, 'User Not Authenticated');
      }

      var token = jwt.sign({
        id: req.user.id,
      }, 'my-secret', {
        expiresIn: 60 * 120,
      });

      res.setHeader('x-auth-token', token);
      res.json(req.user);
    });

  app.route('/auth/facebook/register')
    .post(auth.facebookAuthenticate, async(req, res, next) => {
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
    });

  app.route('/auth/me')
    .get(async(req, res) => {
      if (!req.user) {
        return res.status(401).send();
      }
      res.json(req.user);
    });
};
