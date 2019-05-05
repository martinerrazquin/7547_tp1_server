'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Trips', 'clientRating', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {
        rating: 0,
        comments: '',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'clientRating');
  },
};
