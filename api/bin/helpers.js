'use strict';

var { fs, path } = require('../config/dependencies');

var shouldProcess = (baseFile, file) => {
  var isHidden = (file.indexOf('.') === 0);
  var isBaseFile = (file === path.basename(baseFile));
  var isJson = (file.slice(-3) === '.js');
  return !isHidden && !isBaseFile && isJson;
};

module.exports.processFilesInDir = (dirname, filename, process) => {
  fs.readdirSync(dirname)
    .filter(file => {
      return shouldProcess(filename, file);
    }).forEach(file => {
      var filepath = path.join(dirname, file);
      process(filepath);
    });
};
