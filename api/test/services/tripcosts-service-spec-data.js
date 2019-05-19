'use strict';

module.exports = {
  tripCostsLackingFieldValues: {
    k2: 3,
    k3: 1,
    k4: 1,
    k5: 1,
    k6: 1,
  },

  tripCostsOneNegativeValues: {
    k1: -1,
    k2: 3,
    k3: 1,
    k4: 1,
    k5: 1,
    k6: 1,
  },

  tripCostsOKValues: {
    k1: 0,
    k2: 3,
    k3: 1,
    k4: 1,
    k5: 1,
    k6: 1,
  },

  tripData: {
    origin: {
      lat: 34.023,
      lng: 30.001,
      address: 'lo de pepe',
    },
    destination: {
      lat: 15,
      lng: 20,
      address: 'lo de juan',
    },
    id: 76,
    status: 'Buscando',
    driverId: null,
    petQuantities: {
      big: 1,
      small: 0,
      medium: 0,
    },
    bringsEscort: true,
    paymentMethod: 'mp',
    comments: '',
    clientId: 6,
    createdAt: '2019-05-04T19:48:13.503Z',
    updatedAt: '2019-05-05T00:15:53.577Z',
  },
};
