'use strict';

var { processFilesInDir } = require('../helpers/file-handler');

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
