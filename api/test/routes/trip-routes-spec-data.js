'use strict';

module.exports = {
  userData: {
    id: 999,
    facebookId: 'asd',
    facebookToken: 'dsa',
    email: 'a@a.a',
    birthDate: new Date(),
    address: 'asd street',
    phone: '0800-122-2225',
    hasRole: (role) => {
      return role === 'client';
    },
  },

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

  driverData: {
    id: 1,
    userId: null,
    currentLocation: {
      lng: -58.54814270000001,
      lat: -34.5318136,
    },
    createdAt: '2019-04-05T17:05:10.939Z',
    updatedAt: '2019-04-05T17:05:10.939Z',
  },

  confirmedTripData: {
    id: 1,
    origin: {
      lng: -58.54854270000001,
      lat: -34.5311936,
    },
    destination: {
      lat: -34.6168981,
      lng: -58.3686118,
    },
    status: 'En camino',
    driverId: 1,
    driver: {
      id: 1,
      userId: null,
      currentLocation: {
        lng: -58.54814270000001,
        lat: -34.5318136,
      },
      createdAt: '2019-04-05T17:05:10.939Z',
      updatedAt: '2019-04-05T17:05:10.939Z',
    },
  },

  expectedEnCaminoLocationdata: {
    status: 'En camino',
    currentLocation: {
      lng: -58.54814270000001,
      lat: -34.5318136,
    },
  },

  expectedBuscandoLocationdata: {
    status: 'Buscando',
    currentLocation: null,
  },

  directionData: {
    geocoded_waypoints: [
      {
        geocoder_status: 'OK',
        place_id: 'ChIJJRvFAqSwvJURV3WLE561pQo',
        types: [
          'street_address',
        ],
      },
      {
        geocoder_status: 'OK',
        place_id: 'ChIJ93ClWdQ0o5URm9A8FLINDuI',
        types: [
          'street_address',
        ],
      },
    ],
    routes: [
      {
        bounds: {
          northeast: {
            lat: -34.5300926,
            lng: -58.3659322,
          },
          southwest: {
            lat: -34.64951320000001,
            lng: -58.5486117,
          },
        },
        copyrights: 'Map data ©2019 Google',
        legs: [
          {
            distance: {
              text: '31.4 km',
              value: 31381,
            },
            duration: {
              text: '41 mins',
              value: 2463,
            },
            end_address: 'Av. Paseo Colón 800, C1063ACU CABA, Argentina',
            end_location: {
              lat: -34.6169081,
              lng: -58.3687559,
            },
            start_address: 'Rafael Obligado 6692, B1606AOP Villa' +
              'Adelina, Buenos Aires, Argentina',
            start_location: {
              lat: -34.5311418,
              lng: -58.5486117,
            },
            steps: [
              {
                distance: {
                  text: '0.2 km',
                  value: 159,
                },
                duration: {
                  text: '1 min',
                  value: 34,
                },
                end_location: {
                  lat: -34.5300926,
                  lng: -58.5474331,
                },
                start_location: {
                  lat: -34.5311418,
                  lng: -58.5486117,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '1.8 km',
                  value: 1773,
                },
                duration: {
                  text: '5 mins',
                  value: 278,
                },
                end_location: {
                  lat: -34.5431806,
                  lng: -58.5368504,
                },
                maneuver: 'turn-right',
                start_location: {
                  lat: -34.5300926,
                  lng: -58.5474331,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '1.3 km',
                  value: 1314,
                },
                duration: {
                  text: '4 mins',
                  value: 213,
                },
                end_location: {
                  lat: -34.55162250000001,
                  lng: -58.5269215,
                },
                start_location: {
                  lat: -34.5431806,
                  lng: -58.5368504,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.3 km',
                  value: 252,
                },
                duration: {
                  text: '1 min',
                  value: 36,
                },
                end_location: {
                  lat: -34.5504168,
                  lng: -58.5245968,
                },
                maneuver: 'turn-left',
                start_location: {
                  lat: -34.55162250000001,
                  lng: -58.5269215,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '2.5 km',
                  value: 2514,
                },
                duration: {
                  text: '6 mins',
                  value: 332,
                },
                end_location: {
                  lat: -34.5693985,
                  lng: -58.5097841,
                },
                maneuver: 'turn-right',
                start_location: {
                  lat: -34.5504168,
                  lng: -58.5245968,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.1 km',
                  value: 129,
                },
                duration: {
                  text: '1 min',
                  value: 17,
                },
                end_location: {
                  lat: -34.5704633,
                  lng: -58.51030919999999,
                },
                start_location: {
                  lat: -34.5693985,
                  lng: -58.5097841,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '64 m',
                  value: 64,
                },
                duration: {
                  text: '1 min',
                  value: 6,
                },
                end_location: {
                  lat: -34.571026,
                  lng: -58.5104523,
                },
                start_location: {
                  lat: -34.5704633,
                  lng: -58.51030919999999,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '7.0 km',
                  value: 6970,
                },
                duration: {
                  text: '6 mins',
                  value: 367,
                },
                end_location: {
                  lat: -34.6305261,
                  lng: -58.5302089,
                },
                maneuver: 'fork-left',
                start_location: {
                  lat: -34.571026,
                  lng: -58.5104523,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.8 km',
                  value: 817,
                },
                duration: {
                  text: '1 min',
                  value: 61,
                },
                end_location: {
                  lat: -34.6350269,
                  lng: -58.5278793,
                },
                maneuver: 'ramp-right',
                start_location: {
                  lat: -34.6305261,
                  lng: -58.5302089,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '6.9 km',
                  value: 6858,
                },
                duration: {
                  text: '7 mins',
                  value: 409,
                },
                end_location: {
                  lat: -34.6457705,
                  lng: -58.4626488,
                },
                start_location: {
                  lat: -34.6350269,
                  lng: -58.5278793,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '9.1 km',
                  value: 9130,
                },
                duration: {
                  text: '8 mins',
                  value: 475,
                },
                end_location: {
                  lat: -34.6225905,
                  lng: -58.3715301,
                },
                maneuver: 'merge',
                start_location: {
                  lat: -34.6457705,
                  lng: -58.4626488,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.5 km',
                  value: 523,
                },
                duration: {
                  text: '1 min',
                  value: 65,
                },
                end_location: {
                  lat: -34.6225589,
                  lng: -58.3659417,
                },
                maneuver: 'ramp-right',
                start_location: {
                  lat: -34.6225905,
                  lng: -58.3715301,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '12 m',
                  value: 12,
                },
                duration: {
                  text: '1 min',
                  value: 2,
                },
                end_location: {
                  lat: -34.6226647,
                  lng: -58.3659322,
                },
                maneuver: 'turn-right',
                start_location: {
                  lat: -34.6225589,
                  lng: -58.3659417,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.2 km',
                  value: 209,
                },
                duration: {
                  text: '1 min',
                  value: 46,
                },
                end_location: {
                  lat: -34.62278540000001,
                  lng: -58.3682155,
                },
                maneuver: 'turn-right',
                start_location: {
                  lat: -34.6226647,
                  lng: -58.3659322,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.6 km',
                  value: 643,
                },
                duration: {
                  text: '2 mins',
                  value: 120,
                },
                end_location: {
                  lat: -34.6170324,
                  lng: -58.3687431,
                },
                maneuver: 'turn-right',
                start_location: {
                  lat: -34.62278540000001,
                  lng: -58.3682155,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '14 m',
                  value: 14,
                },
                duration: {
                  text: '1 min',
                  value: 2,
                },
                end_location: {
                  lat: -34.6169081,
                  lng: -58.3687559,
                },
                maneuver: 'straight',
                start_location: {
                  lat: -34.6170324,
                  lng: -58.3687431,
                },
                travel_mode: 'DRIVING',
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        summary: 'Au 25 de Mayo',
        warnings: [],
        waypoint_order: [],
      },
    ],
    status: 'OK',
  },
  mockRouteData: {
    geocoded_waypoints: [
      {
        geocoder_status: 'OK',
        place_id: 'ChIJJRvFAqSwvJURV3WLE561pQo',
        types: [
          'street_address',
        ],
      },
      {
        geocoder_status: 'OK',
        place_id: 'ChIJ93ClWdQ0o5URm9A8FLINDuI',
        types: [
          'street_address',
        ],
      },
    ],
    routes: [
      {
        bounds: {
          northeast: {
            lat: -34.5300926,
            lng: -58.3659322,
          },
          southwest: {
            lat: -34.64951320000001,
            lng: -58.5486117,
          },
        },
        copyrights: 'Map data ©2019 Google',
        legs: [
          {
            distance: {
              text: '31.4 km',
              value: 31381,
            },
            duration: {
              text: '41 mins',
              value: 2463,
            },
            end_address: 'Av. Paseo Colón 800, C1063ACU CABA, Argentina',
            end_location: {
              lat: 4,
              lng: 4,
            },
            start_address: 'Rafael Obligado 6692, B1606AOP Villa' +
              'Adelina, Buenos Aires, Argentina',
            start_location: {
              lat: 1,
              lng: 1,
            },
            steps: [
              {
                distance: {
                  text: '0.2 km',
                  value: 159,
                },
                duration: {
                  text: '1 min',
                  value: 34,
                },
                end_location: {
                  lat: 2,
                  lng: 2,
                },
                start_location: {
                  lat: 1,
                  lng: 1,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.2 km',
                  value: 159,
                },
                duration: {
                  text: '1 min',
                  value: 34,
                },
                end_location: {
                  lat: 3,
                  lng: 3,
                },
                start_location: {
                  lat: 2,
                  lng: 2,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.2 km',
                  value: 159,
                },
                duration: {
                  text: '1 min',
                  value: 34,
                },
                end_location: {
                  lat: 4,
                  lng: 4,
                },
                start_location: {
                  lat: 3,
                  lng: 3,
                },
                travel_mode: 'DRIVING',
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        summary: 'Au 25 de Mayo',
        warnings: [],
        waypoint_order: [],
      },
    ],
    status: 'OK',
  },
};
