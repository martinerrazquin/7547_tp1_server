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
      }
    },
  }, {});

  Driver.associate = function(models) {
    // associations can be defined here
  };

  return Driver;
};
