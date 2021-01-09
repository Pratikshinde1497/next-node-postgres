module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    role: { 
      type: Sequelize.ENUM('admin', 'publisher')
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};