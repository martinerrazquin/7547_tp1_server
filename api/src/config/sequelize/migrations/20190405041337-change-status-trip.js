'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Trips', 'status',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Buscando',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Trips', 'status',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'En camino',
      });
  },
};
