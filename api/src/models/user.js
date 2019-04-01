'use strict';

module.exports = (sequelize, type) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: type.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: type.STRING,
    },
    lastName: {
      allowNull: false,
      type: type.STRING,
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = (models) => {
    // Add any relations (foreign keys) here.
  };

  return User;
};
