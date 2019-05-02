'use strict';

var { User, Driver } = require('../models');

const PAGE_SIZE = 10;

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

UserService.list = async(page = 0) => {
  return await User.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
  });
};

UserService.getById = async(userId, scope = 'defaultScope') => {
  var query = {
    where: { id: userId },
  };

  return await User.scope(scope).findOne(query);
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
