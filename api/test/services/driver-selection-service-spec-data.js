'use strict';

// USING https://gps-coordinates.org/distance-between-coordinates.php
// FOR DISTANCES
module.exports = {
  tripData: {
    id: 1,
    origin: {
      lng: -58.54854270000001,
      lat: -34.5311936,
    },
    destination: {
      lat: -34.6168981,
      lng: -58.3686118,
    },
    status: 'Buscando',
    driverId: null,
  },

  near_origin_best_ratings_best_nor_driverData: {
    id: 1,
    userId: null,
    currentLocation: {
      lng: -58.55,
      lat: -34.54010633,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 10,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  near_origin_best_ratings_good_nor_driverData: {
    id: 2,
    userId: null,
    currentLocation: {
      lng: -58.54814270000001,
      lat: -34.5318136,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 5,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  near_origin_good_ratings_best_nor_driverData: {
    id: 3,
    userId: null,
    currentLocation: {
      lng: -58.54814270000001,
      lat: -34.5318136,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 5,
      four: 0,
      five: 5,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  // 1.44 km from origin at tripData
  close_to_origin_best_ratings_best_nor_driverData: {
    id: 4,
    userId: null,
    currentLocation: {
      lng: -58.55814270000001,
      lat: -34.5418136,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 10,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  // 1.44 km from origin at tripData
  close_to_origin_best_ratings_good_nor_driverData: {
    id: 5,
    userId: null,
    currentLocation: {
      lng: -58.55814270000001,
      lat: -34.5418136,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 5,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  // 66.44 km from origin at tripData
  far_from_origin_best_ratings_good_nor_driverData: {
    id: 6,
    userId: null,
    currentLocation: {
      lng: -59.0,
      lat: -35.0,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 5,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },


  // 1969.5 km from origin at tripData
  unreachable_from_origin_best_ratings_best_nor_driverData: {
    id: 7,
    userId: null,
    currentLocation: {
      lng: -70.0,
      lat: -20.0,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 10,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  // 1.44 km from origin at tripData
  close_to_origin_best_ratings_good_nor_driverData2: {
    id: 8,
    userId: null,
    currentLocation: {
      lng: -58.55814270000001,
      lat: -34.5418136,
    },
    ratings: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 5,
      rejections: 0,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },
};
