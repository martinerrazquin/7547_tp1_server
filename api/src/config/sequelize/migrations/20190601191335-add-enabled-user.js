'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('Drivers', 'enabledToDrive', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }),
      await queryInterface.changeColumn('Drivers', 'enabledToDrive', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Drivers', 'enabledToDrive');
  },
};
