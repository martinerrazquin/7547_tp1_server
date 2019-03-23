'use strict';

var { processFilesInDir } = require('../bin/helpers');

var controllers = {};

processFilesInDir(__dirname, __filename, (filepath) => {
  var controller = require(filepath);
  controllers[controller.name] = controller;
});

module.exports = controllers;
