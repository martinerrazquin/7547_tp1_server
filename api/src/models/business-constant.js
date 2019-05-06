'use strict';
module.exports = (sequelize, Sequelize) => {
  const BusinessConstant = sequelize.define('BusinessConstant', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: Sequelize.JSONB,
      allowNull: false,
      get() {
        const value = this.getDataValue('value');
        return (typeof value === 'string') ? JSON.parse(value) : value;
      },
    },
  }, {});


  BusinessConstant.associate = function(models) {
    // associations can be defined here
  };

  return BusinessConstant;
};
