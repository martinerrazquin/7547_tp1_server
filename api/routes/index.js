'use strict';

var { processFilesInDir } = require('../bin/helpers');

module.exports = (app) => {
  // Health check
  app.route('/ping')
    .get((req, res) => {
      res.send('pong');
    });

  processFilesInDir(__dirname, __filename, (filepath) => {
    require(filepath)(app);
  });
};
