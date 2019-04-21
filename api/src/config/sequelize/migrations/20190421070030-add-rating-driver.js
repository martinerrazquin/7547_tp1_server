'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Drivers', 'ratings', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {
        one: 0,
        two: 0,
        three: 1,
        four: 0,
        five: 0,
        rejections: 0,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Drivers', 'ratings');
  },
};
