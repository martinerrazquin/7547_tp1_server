'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Drivers', 'suggestions', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {
        app: 0,
        vehicle: 0,
        driver: 0,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Drivers', 'suggestions');
  },
};
