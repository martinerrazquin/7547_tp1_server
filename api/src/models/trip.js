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
      type: Sequelize.ENUM(
        'Buscando',
        'En camino',
        'En origen',
        'En viaje',
        'Llegamos',
        'Finalizado',
        'Cancelado',
        'Reservado'
      ),
      defaultValue: 'Buscando',
      allowNull: false,
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
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reservationDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    driverRating: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    clientRating: {
      type: Sequelize.JSONB,
      allowNull: true,
      validate: {
        commentNotLongerThan500(value){
          if (value && value.comments && value.comments.length >= 500){
            throw new Error('CommentsLongerThan500Chars');
          }
        },
      },
    },
  }, {
    validate: {
      isValidTransition() {
        var oldStatus = this._previousDataValues.status;
        var newStatus = this.dataValues.status;

        var validTransitions = {
          Buscando: [ 'En camino', 'Reservado', 'Cancelado' ],
          'En camino': ['En origen', 'Cancelado'],
          'En origen': ['En viaje', 'Cancelado'],
          'En viaje': ['Llegamos', 'Cancelado'],
          Llegamos: ['Finalizado', 'Cancelado'],
          Finalizado: [],
          Cancelado: [],
          Reservado: ['En camino', 'Cancelado'],
        };

        if (oldStatus && oldStatus !== newStatus
          && !validTransitions[oldStatus].includes(newStatus)){
          throw new Error('InvalidStateTransition');
        }
      },
    },
  });

  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
    Trip.belongsTo(models.User, { foreignKey: 'clientId', as: 'client' });
    Trip.belongsToMany(models.Driver, {
      foreignKey: 'tripId',
      as: 'drivers',
      through: models.DriverTripOffer,
    });
  };

  return Trip;
};
