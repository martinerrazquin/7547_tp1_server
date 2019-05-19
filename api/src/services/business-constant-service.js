'use strict';

var { jsonschema } = require('../config/dependencies');

var BusinessConstantService = {};

BusinessConstantService.name = 'BusinessConstantService';

BusinessConstantService.fitsSchema = (instance, schema, errMsg = null) => {

  var result = jsonschema.validate(instance, schema);
  if (errMsg && !result.valid){
    console.log(result.errors);
    var e = Error();
    e.name = errMsg;
    throw e;
  }

  return result.valid;
};

module.exports = BusinessConstantService;
