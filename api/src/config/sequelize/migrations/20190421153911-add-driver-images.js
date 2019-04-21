'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.bulkDelete('Drivers', {}),
      await queryInterface.addColumn('Drivers', 'drivingRecordImage', {
        type: Sequelize.TEXT,
        allowNull: false
      }),
      await queryInterface.addColumn('Drivers', 'policyImage', {
        type: Sequelize.TEXT,
        allowNull: false
      }),
      await queryInterface.addColumn('Drivers', 'transportImage', {
        type: Sequelize.TEXT,
        allowNull: false
      }),
    ];
  },

  down: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Drivers', 'drivingRecordImage'),
      await queryInterface.removeColumn('Drivers', 'policyImage'),
      await queryInterface.removeColumn('Drivers', 'transportImage'),
    ];
  }
};
