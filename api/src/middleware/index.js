'use strict';

var { processFilesInDir } = require('../helpers/file-handler');

var middleware = {};

processFilesInDir(__dirname, __filename, (filepath) => {
  var mid = require(filepath);
  middleware[mid.name] = mid;
});

module.exports = middleware;
