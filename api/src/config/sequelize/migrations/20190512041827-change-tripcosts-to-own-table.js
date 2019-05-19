'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.dropTable('BusinessConstants'),
      await queryInterface.createTable('TripCosts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        k1: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        k2: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        k3: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        k4: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        k5: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        k6: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    ];
  },

  down: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.dropTable('TripCosts'),
      await queryInterface.createTable('BusinessConstants', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        value: {
          type: Sequelize.JSONB,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    ];
  },
};
