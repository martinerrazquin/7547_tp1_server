'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('Trips', 'paymentMethod', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Efectivo',
      }),
      await queryInterface.addColumn('Trips', 'comments', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }),

    ];
  },

  down: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Trips', 'paymentMethod'),
      await queryInterface.removeColumn('Trips', 'comments'),
    ];
  },
};
