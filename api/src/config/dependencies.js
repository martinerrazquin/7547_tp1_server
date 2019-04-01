'use strict';

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
Sequelize.config = require('./sequelize/config.json')[env];

module.exports = {
  debug: require('debug')('hypechat:server'),
  fs: require('fs'),
  path: require('path'),
  Sequelize: Sequelize,
  express: require('express'),
  logger: require('morgan'),
};
