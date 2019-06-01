'use strict';

module.exports = {
  driverUser: {
    id: 1,
    facebookId: '1111111111111111',
    email: 'test@test.com',
    birthDate: '1900-01-01T17:05:10.939Z',
    address: 'Some Address 111',
    phone: '111111111',
    createdAt: '2019-04-28T20:29:58.795Z',
    updatedAt: '2019-04-28T20:29:58.795Z',
    driverData: {
      id: 1,
      currentLocation: {
        lat: 34,
        lng: 30,
      },
      ratings: {
        one: 1,
        two: 1,
        five: 2,
        four: 2,
        three: 1,
        rejections: 0,
      },
      status: 'No disponible',
      trips: [],
      enabledToDrive: false,
    },
    hasRole: (role) => {
      return role === 'driver';
    },
  },
};
