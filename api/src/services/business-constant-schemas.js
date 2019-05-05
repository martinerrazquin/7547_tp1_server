'use strict';

module.exports = {

  TripCostsSchema: {
    type: 'object',
    properties: {
      k1: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      k2: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      k3: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      k4: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      k5: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      k6: {
        type: 'number',
        minimum: 0,
        required: true,
      },
    },
    additionalProperties: false,
  },


};
