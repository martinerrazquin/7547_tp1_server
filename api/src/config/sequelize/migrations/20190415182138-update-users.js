'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
        await queryInterface.dropTable('Users'),
        await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        facebookId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        facebookToken: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
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

  down: async(queryInterface, Sequelize) => {
    return [
        await queryInterface.dropTable('Users'),
        await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        lastName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
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
