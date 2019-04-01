'use strict';

var { processFilesInDir } = require('../helpers/file-handler');
var { Sequelize } = require('../config/dependencies');
var config = Sequelize.config;

var sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

var models = {};

processFilesInDir(__dirname, __filename, (filepath) => {
  var model = sequelize.import(filepath);
  models[model.name] = model;
});

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
