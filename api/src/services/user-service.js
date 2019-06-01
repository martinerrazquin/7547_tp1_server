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

UserService.list = async(page = 0, onlyDrivers = false) => {
  var query = {
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
  };

  if (onlyDrivers) {
    query.include = [
      {
        model: Driver,
        as: 'driverData',
        required: true,
      },
    ];
  }

  var users = await User.findAll(query);
  delete query.offset;
  delete query.limit;
  var tripCount = await User.count(query);
  return { pageContents: users, total: tripCount };
};

UserService.getById = async(userId, scope = 'defaultScope') => {
  return await User.scope(scope).findOne({
    where: { id: userId },
  });
};

UserService.getByFacebookId = async(facebookId, scope = 'defaultScope') => {
  return await User.scope(scope).findOne({
    where: { facebookId: facebookId },
  });
};

UserService.getByFacebookToken = async(fbToken, scope = 'defaultScope') => {
  return await User.scope(scope).findOne({
    where: { facebookToken: fbToken },
  });
};

UserService.update = async(userId, userData) => {
  var updated = await User.update(userData, {
    returning: true,
    where: { id: userId },
  });

  if (updated.length === 1) {
    return null;
  } else {
    var user = updated[1][0];
    return user.toJSON ? user.toJSON() : user;
  }
};

UserService.delete = async(userId) => {
  return await User.destroy({ where: { id: userId } });
};

module.exports = UserService;
