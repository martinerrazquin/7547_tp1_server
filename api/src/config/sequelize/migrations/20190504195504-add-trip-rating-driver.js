'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Trips', 'driverRating', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        rating: 0,
        suggestions: {
          app: false,
          vehicle: false,
          driver: false,
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'driverRating');
  },
};
