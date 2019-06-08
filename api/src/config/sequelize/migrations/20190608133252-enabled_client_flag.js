'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('Users', 'enabledClient', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'enabledClient');
  },
};
