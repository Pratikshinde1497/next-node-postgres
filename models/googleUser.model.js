const { guser } = require("./schemas");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("guser", guser(Sequelize));

  return User;
};