'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Trips', 'petQuantities', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {
        small: 0,
        medium: 1,
        large: 0,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'petQuantities');
  },
};
