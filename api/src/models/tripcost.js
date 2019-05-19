'use strict';
module.exports = (sequelize, Sequelize) => {
  const TripCost = sequelize.define('TripCost', {
    k1: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    k2: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    k3: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    k4: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    k5: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    k6: {
      type: Sequelize.DOUBLE,
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
  }, {});


  TripCost.associate = function(models) {
    // associations can be defined here
  };

  return TripCost;
};
