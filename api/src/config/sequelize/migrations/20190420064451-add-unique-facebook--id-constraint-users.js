'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.bulkDelete('Users', {}),
      await queryInterface.addConstraint('Users', ['facebookId'], {
        type: 'unique',
        name: 'user_facebook_id_unique',
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'user_facebook_id_unique');
  },
};
