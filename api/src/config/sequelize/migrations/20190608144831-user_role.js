'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'client',
      }),
      await queryInterface.sequelize.query('UPDATE "Users"\n' +
                'SET "role" = \'driver\'\n' +
                'FROM (SELECT u.id FROM "Users" u\n' +
                '        LEFT JOIN "Drivers" d ON d."userId" = u.id\n' +
                '        WHERE d.id NOTNULL) AS subquery\n' +
                'WHERE "Users".id = subquery.id;\n'),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'role');
  },
};
