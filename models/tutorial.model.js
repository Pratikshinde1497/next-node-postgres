const { tutorial } = require("./schemas");

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", tutorial(Sequelize));
  
    return Tutorial;
  };