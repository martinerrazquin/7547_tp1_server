'use strict';
module.exports = (sequelize, Sequelize) => {
  const DriverTripOffer = sequelize.define('DriverTripOffer', {
    driverId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tripId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: Sequelize.ENUM('Pendiente', 'Aceptado', 'Rechazado'),
      defaultValue: 'Pendiente',
      allowNull: false,
    },
  }, {});

  DriverTripOffer.associate = function(models) {
    // associations can be defined here
  };

  return DriverTripOffer;
};
