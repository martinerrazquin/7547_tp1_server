'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'facebookToken', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'invalid',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'facebookToken');
  },
};
