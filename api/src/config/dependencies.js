'use strict';

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
Sequelize.config = require('./sequelize/config.json')[env];

var mapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise,
});

var passport = require('passport');
passport.facebookStrategy = require('passport-facebook-token');

module.exports = {
  debug: require('debug')('hypechat:server'),
  fs: require('fs'),
  path: require('path'),
  Sequelize: Sequelize,
  express: require('express'),
  logger: require('morgan'),
  googleMapsClientService: mapsClient,
  passport: passport,
  jwt: require('jsonwebtoken'),
};
