'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Trips', 'origin'),
      await queryInterface.addColumn('Trips', 'origin', {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          lat: 0,
          lng: 0,
        },
      }),
      await queryInterface.removeColumn('Trips', 'destination'),
      await queryInterface.addColumn('Trips', 'destination', {
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
      await queryInterface.removeColumn('Trips', 'origin'),
      await queryInterface.addColumn('Trips', 'origin', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }),
      await queryInterface.removeColumn('Trips', 'destination'),
      await queryInterface.addColumn('Trips', 'destination', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }),
    ];
  },
};
