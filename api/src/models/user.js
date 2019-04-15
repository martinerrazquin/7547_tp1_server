'use strict';

module.exports = (sequelize, type) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: type.INTEGER,
    },
    facebookId: {
      type: type.STRING,
      allowNull: false,
    },
    facebookToken: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    birthDate: {
      type: type.DATE,
      allowNull: false,
      // TODO remove this after implementing real registration.
      defaultValue: '2019-04-05T17:05:10.939Z',
    },
    address: {
      type: type.STRING,
      allowNull: false,
      // TODO remove this after implementing real registration.
      defaultValue: 'Fake adress 123',
    },
    phone: {
      type: type.STRING,
      allowNull: false,
      // TODO remove this after implementing real registration.
      defaultValue: '4444-4444',
    },
  });

  User.associate = (models) => {
    // Add any relations (foreign keys) here.
  };

  return User;
};
