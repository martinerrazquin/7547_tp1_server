'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Drivers', 'status', {
      type: Sequelize.ENUM('Disponible', 'No disponible'),
      defaultValue: 'No disponible',
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Drivers', 'status');
  },
};
