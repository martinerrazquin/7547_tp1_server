'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TripCosts', [{
      k1: 1,
      k2: 1,
      k3: 1,
      k4: 1,
      k5: 1,
      k6: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TripCosts',
      null, {});
  },
};
