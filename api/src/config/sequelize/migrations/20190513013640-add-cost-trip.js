'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Trips', 'cost', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 100.0,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'cost');
  },
};
