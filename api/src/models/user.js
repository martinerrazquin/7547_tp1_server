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
    facebookToken: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'invalid',
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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    enabledClient: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'client',
    },
  }, {
    defaultScope: {
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
              'id', 'userId', 'drivingRecordImage', 'suggestions',
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
                [Sequelize.Op.notIn]: ['Cancelado', 'Finalizado', 'Reservado'],
              },
            },
            through: {
              where: {
                status: ['Pendiente', 'Aceptado'],
              },
              // attributes: [],
            },
            include: [{
              association: 'client',
              attributes: [ 'name' ],
            }],
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
