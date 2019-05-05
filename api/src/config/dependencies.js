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
  googleMapsClientService: require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise,
  }),
  geolocationUtils: require('geolocation-utils'),
  passport: require('passport'),
  FacebookStrategy: require('passport-facebook-token'),
  jwt: require('jsonwebtoken'),
  moment: require('moment'),
  jsonschema: require('jsonschema'),
};
