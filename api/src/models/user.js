'use strict';

var { Sequelize } = require('../config/dependencies');

module.exports = (sequelize, type) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: type.INTEGER,
    },
    facebookId: {
      type: type.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    birthDate: {
      type: type.DATE,
      allowNull: false,
    },
    address: {
      type: type.STRING,
      allowNull: false,
    },
    phone: {
      type: type.STRING,
      allowNull: false,
    },
  }, {
    defaultScope: {
      include: [{
        association: 'driverData',
        required: false,
        attributes: {
          exclude: [
            'id', 'userId', 'drivingRecordImage',
            'policyImage', 'transportImage',
            'createdAt', 'updatedAt',
          ],
        },
      }],
    },
    scopes: {
      withDriverId: {
        include: [{
          association: 'driverData',
          required: false,
          attributes: {
            exclude: [
              'userId', 'drivingRecordImage',
              'policyImage', 'transportImage',
              'createdAt', 'updatedAt',
            ],
          },
        }],
        attributes: {
          exclude: ['facebookToken'],
        },
      },
      driverStatusUpdate: {
        include: [{
          association: 'driverData',
          required: false,
          attributes: {
            exclude: [
              'id', 'userId', 'drivingRecordImage',
              'policyImage', 'transportImage', 'ratings',
              'createdAt', 'updatedAt',
            ],
          },
          include: [{
            association: 'trips',
            attributes: {
              exclude: [
                'driverId', 'createdAt', 'updatedAt',
              ],
            },
            where: {
              status: {
                [Sequelize.Op.notIn]: ['Cancelado', 'Finalizado'],
              },
            },
            through: {
              where: {
                status: ['Pendiente', 'Aceptado'],
              },
              // attributes: [],
            },
            required: false,
          }],
        }],
        attributes: {
          exclude: ['facebookToken'],
        },
      },
    },
  });

  User.associate = (models) => {
    // Add any relations (foreign keys) here.
    User.hasOne(models.Driver, { foreignKey: 'userId', as: 'driverData' });
  };

  User.prototype.hasRole = function(role) {
    if (!['driver', 'client'].includes(role)) {
      var e = new Error();
      e.name = 'InvalidUserRole';
      throw e;
    }

    if (role === 'client') {
      return !this.driverData;
    } else {
      return this.driverData;
    }
  };

  return User;
};
