'use strict';

var { geolocationUtils } = require('../config/dependencies');

module.exports.generateRandomPoint = (center, maxDist, minDist = 0) => {
  var heading = Math.random() * 360;
  var distance = minDist + Math.random() * (maxDist - minDist);
  var result = geolocationUtils.moveTo(center, {heading, distance});
  return result;
};

module.exports.moveTowards = (current, target, maxDelta) => {
  var headingDistance = geolocationUtils.headingDistanceTo(
    current,
    target
  );

  headingDistance.distance = Math.min(headingDistance.distance, maxDelta);
  return geolocationUtils.moveTo(current, headingDistance);
};

module.exports.isSimilar = (first, second, delta = 1e-12) => {
  return geolocationUtils.isEqual(first, second, delta);
};
