'use strict';
module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define('Driver', {
    userId: {
      type: Sequelize.INTEGER,
    },
    currentLocation: {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {
        lat: 0,
        lng: 0,
      },
      get() {
        const value = this.getDataValue('currentLocation');
        return (typeof value === 'string') ? JSON.parse(value) : value;
      },
    },
    ratings: {
      type: Sequelize.JSONB,
      allowNull: false,
      get() {
        const value = this.getDataValue('ratings');
        return (typeof value === 'string') ? JSON.parse(value) : value;
      },
      validate: {
        nonNegativeFields(value) {
          if (!(value.one >= 0 && value.two >= 0 && value.three >= 0 &&
              value.four >= 0 && value.five >= 0 && value.rejections >= 0)) {
            throw new Error('RatingsAreNegative');
          }
        },
      },
      defaultValue: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        rejections: 0,
      },
    },
    drivingRecordImage: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    policyImage: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    transportImage: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('Disponible', 'No disponible'),
      defaultValue: 'No disponible',
      allowNull: false,
    },
  }, {});

  Driver.associate = function(models) {
    // associations can be defined here
    Driver.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' });
    Driver.belongsToMany(models.Trip, {
      foreignKey: 'driverId',
      as: 'trips',
      through: models.DriverTripOffer,
    });
  };

  return Driver;
};
