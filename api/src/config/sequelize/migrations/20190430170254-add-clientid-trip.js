'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Trips', 'clientId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 999,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'clientId');
  },
};
