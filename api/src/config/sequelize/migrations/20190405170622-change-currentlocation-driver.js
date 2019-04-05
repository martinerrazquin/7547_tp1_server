'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Drivers', 'currentLocation'),
      await queryInterface.addColumn('Drivers', 'currentLocation', {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          lat: 0,
          lng: 0,
        },
      }),
    ];
  },

  down: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Drivers', 'currentLocation'),
      await queryInterface.addColumn('Drivers', 'currentLocation', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }),
    ];
  },
};
