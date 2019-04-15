'use strict';

var { jwt } = require('../config/dependencies');

var { auth } = require('../middleware');

module.exports = (app) => {
  app.route('/auth/facebook')
    .post(auth.facebookAuthenticate, function(req, res) {
      if (!req.user) {
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

  app.route('/auth/me')
    .get(async(req, res) => {
      if (!req.user) {
        return res.status(401).send();
      }
      res.json(req.user);
    });
};
