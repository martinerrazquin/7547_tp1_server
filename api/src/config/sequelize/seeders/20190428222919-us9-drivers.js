'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drivers', [

      {// c1
        userId: 101,
        currentLocation: JSON.stringify({
          lat: -34.52,
          lng: -58.544,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 1,
          three: 0,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c2
        userId: 102,
        currentLocation: JSON.stringify({
          lat: -34.516,
          lng: -58.528,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 1,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c4
        userId: 104,
        currentLocation: JSON.stringify({
          lat: -33.005,
          lng: -60.8,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 1,
          three: 0,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c5
        userId: 105,
        currentLocation: JSON.stringify({
          lat: -33.005,
          lng: -60.8001,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 1,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c6
        userId: 106,
        currentLocation: JSON.stringify({
          lat: -33,
          lng: -60.81,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 0,
          four: 1,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c7
        userId: 107,
        currentLocation: JSON.stringify({
          lat: -35.721,
          lng: -63.7455,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 2,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c8
        userId: 108,
        currentLocation: JSON.stringify({
          lat: -35.721,
          lng: -63.7455,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 1,
          four: 0,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c11
        userId: 111,
        currentLocation: JSON.stringify({
          lat: -33.406,
          lng: -66.3146,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 0,
          four: 3,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {// c12
        userId: 112,
        currentLocation: JSON.stringify({
          lat: -33.406,
          lng: -66.3144,
        }),
        ratings: JSON.stringify({
          one: 0,
          two: 0,
          three: 0,
          four: 3,
          five: 0,
          rejections: 0,
        }),
        drivingRecordImage: 'NONE',
        policyImage: 'NONE',
        transportImage: 'NONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drivers', null, {});
  },
};
