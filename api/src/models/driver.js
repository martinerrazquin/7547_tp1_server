'use strict';
module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define('Driver', {
    userId: {
      type: Sequelize.INTEGER,
    },
    currentLocation: {
      type: Sequelize.STRING,
    },
  }, {});

  Driver.associate = function(models) {
    // associations can be defined here
  };

  return Driver;
};
