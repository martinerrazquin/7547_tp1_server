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
    petQuantities: {
      type: Sequelize.JSONB,
      allowNull: false,
      validate: {
        nonNegativeFields(value){
          if (!(value.small >= 0 && value.medium >= 0 && value.big >= 0)){
            throw new Error('PetQuantitiesAreNegative');
          }
        },
        sumNotAbove3(value){
          if (value.small + value.medium + value.big > 3){
            throw new Error('PetQuantitiesAbove3');
          }
        },
      },
    },
    bringsEscort: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['cash', 'card', 'mp']],
      },
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0, 250],
      },
    },
  }, {});

  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
  };

  return Trip;
};
