'use strict';

var { processFilesInDir } = require('../helpers/file-handler');

var services = {};

processFilesInDir(__dirname, __filename, (filepath) => {
  var service = require(filepath);
  services[service.name] = service;
});

module.exports = services;
