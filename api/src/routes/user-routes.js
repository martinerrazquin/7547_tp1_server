'use strict';

var { UserController } = require('../controllers');

module.exports = (app) => {
  app.route('/users/:userId')
    .get(UserController.retrieve)
    .put(UserController.update)
    .delete(UserController.delete);

  app.route('/users')
    .get(UserController.list);

  app.route('/clients')
      .get(UserController.listClients);

  app.route('/clients/:userId/enabled-state')
      .post(
          UserController.updateClientEnabledState
      );
};
