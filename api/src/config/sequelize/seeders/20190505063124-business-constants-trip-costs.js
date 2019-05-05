'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BusinessConstants', [{
      name: 'TripCosts',
      value: JSON.stringify({
        k1: 1,
        k2: 1,
        k3: 1,
        k4: 1,
        k5: 1,
        k6: 10
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BusinessConstants', [{name: 'TripCosts'}], {});
  }
};
