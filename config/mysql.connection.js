const config = require("./config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  operatorsAliases: '0',
  logging: (config.database.logging === 'true' ? console.log : false),
  pool: {
    max: config.database.pool.max,
    min: config.database.pool.min,
    acquire: config.database.pool.acquire,
    idle: config.database.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("../models/v1/students.model")(sequelize, Sequelize);
db.subjects = require("../models/v1/subjects.model")(sequelize, Sequelize);
db.students.belongsToMany(db.subjects, {
  through: "student_subject",
  as: "subjects",
  foreignKey: "student_id",
});
db.subjects.belongsToMany(db.students, {
  through: "student_subject",
  as: "students",
  foreignKey: "subject_id",
});
module.exports = db;