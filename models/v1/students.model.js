module.exports = (sequelize, Sequelize) => {
  const Students = sequelize.define("students", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    class_no: {
      type: Sequelize.STRING
    },
    profile_picture: {
      type: Sequelize.STRING
    },
  });

  return Students;
};