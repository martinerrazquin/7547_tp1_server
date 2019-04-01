'use strict';

var { UserController } = require('../controllers');

module.exports = (app) => {
  app.route('/users')
    .post(UserController.create);

  app.route('/users/:userId')
    .get(UserController.retrieve)
    .put(UserController.update)
    .delete(UserController.delete);
};
