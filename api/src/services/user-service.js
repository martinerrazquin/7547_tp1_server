'use strict';

var { User, Driver } = require('../models');

var UserService = {};

UserService.name = 'UserService';

UserService.createDriver = async(userData) => {
  var user = await User.create(userData, {
    include: [ {model: Driver, as: 'driverData'} ],
  });
  return UserService.getById(user.id);
};

UserService.createClient = async(userData) => {
  return await User.create(userData);
};

UserService.getById = async(userId, scope = null) => {
  var query = {
    where: { id: userId },
  };

  if (scope) {
    return await User.scope(scope).findOne(query);
  }

  return await User.findOne(query);
};

UserService.getByFacebookId = async(facebookId) => {
  return await User.findOne({
    where: { facebookId: facebookId },
  });
};

UserService.delete = async(userId) => {
  return await User.destroy({ where: { id: userId } });
};

module.exports = UserService;
