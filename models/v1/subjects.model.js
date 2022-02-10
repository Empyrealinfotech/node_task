module.exports = (sequelize, Sequelize) => {
  const Subjects = sequelize.define("subjects", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Subjects;
};