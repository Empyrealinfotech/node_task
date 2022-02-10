const moment = require("moment");
const config = require('../../config/config');
const db = require("../../config/mysql.connection");
const Subjects = db.subjects;
const Students = db.students;
const Op = db.Sequelize.Op;

// get student list
const getStudents = async function (req, res) {
  const body = req.body;

  // Save Tutorial in the database
  let all_fields = body.field.split(',');

  let sub_fields = all_fields.filter((field) => !/^[A-Za-z_]*$/.test(field));
  let main_fields = all_fields.filter((field) => /^[A-Za-z_]*$/.test(field));
  sub_fields = sub_fields.map(f => f.split('.')[1]);

  Students.findAll({
    limit: 20,
    attributes: main_fields,
    include: [
      {
        model: Subjects,
        as: "subjects",
        attributes: sub_fields,
        // limit: 5,
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
module.exports.getStudents = getStudents;
