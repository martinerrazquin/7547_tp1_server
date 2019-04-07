'use strict';
module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define('Trip', {
    origin: {
      type: Sequelize.JSONB,
      allowNull: false,
      get() {
        const value = this.getDataValue('origin');
        return (typeof value === 'string') ? JSON.parse(value) : value;
      },
    },
    destination: {
      type: Sequelize.JSONB,
      allowNull: false,
      get() {
        const value = this.getDataValue('destination');
        return (typeof value === 'string') ? JSON.parse(value) : value;
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Buscando',
    },
    driverId: {
      type: Sequelize.INTEGER,
    },
  }, {});

  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
  };

  return Trip;
};
