'use strict';

var { User, Driver } = require('../models');

var UserService = {};

UserService.name = 'UserService';

UserService.createDriver = async(userData) => {
  return await User.create(userData, {
    include: [ {model: Driver, as: 'driverData'} ],
  });
};

UserService.createClient = async(userData) => {
  return await User.create(userData);
};

UserService.getById = async(userId) => {
  return await User.findByPk(userId);
};

UserService.getByFacebookId = async(facebookId) => {
  return await User.findOne({ where: { facebookId: facebookId } });
};

UserService.delete = async(userId) => {
  return await User.destroy({ where: { id: userId } });
};

module.exports = UserService;
