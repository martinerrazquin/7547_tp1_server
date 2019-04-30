'use strict';


module.exports.getNumberOfRatings = (driverData) => {
  var ratings = driverData.ratings;
  var total = ratings.one + ratings.two + ratings.three + ratings.four
      + ratings.five;
  return total;
};

module.exports.getScore = (driverData) => {
  var ratings = driverData.ratings;
  var totalScore = ratings.one + 2 * ratings.two + 3 * ratings.three +
      4 * ratings.four + 5 * ratings.five;

  var total = this.getNumberOfRatings(driverData);

  return totalScore / total;
};
