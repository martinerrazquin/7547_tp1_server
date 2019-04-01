'use strict';

var { processFilesInDir } = require('../helpers/file-handler');

var controllers = {};

processFilesInDir(__dirname, __filename, (filepath) => {
  var controller = require(filepath);
  controllers[controller.name] = controller;
});

module.exports = controllers;
