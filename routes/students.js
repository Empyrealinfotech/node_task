const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Joi = require('joi');
const db = require("../config/mysql.connection");
const Students = db.students;
const Subjects = db.subjects;
var s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.AWS_BUCKET
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'monappdev',
    ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      let ext_split = file.originalname.split('.');
      let ext = ext_split[ext_split.length-1];
      req.body.profile_picture = `${process.env.AWS_S3_URL}${Date.now().toString()}.${ext}`;
      cb(null, `${Date.now().toString()}.${ext}`)
    }
  })
})

/* Render add student form */
router.get('/', function(req, res, next) {
  Subjects.findAll({
  })
  .then((subjects) => {
    res.render('students/add', {
      title: 'Add Student',
      first_name: '',
      last_name: '',
      email: '',
      class_no: '',
      subjects: subjects
    });
  })
  .catch((err) => {
    console.log(">> Error while retrieving Tutorials: ", err);
  });
});

/* Add student */
const profile = upload.single('profile_picture');
router.post('/add', function(req, res, next) {
    profile(req, res, function (err) {
      if (err) {
        console.log(err);
      } else {
        const data = { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, class_no: req.body.class_no };
        // define the validation schema
        const schema = Joi.object({
          first_name: Joi.string().required().label("First Name"),
          last_name: Joi.string().required().label("Last Name"),
          email: Joi.string().email().required().label("Email"),
          class_no: Joi.string().required().label("Class")
        });

        // validate the request data against the schema
        const { error, value } = schema.validate(data);
        if (error) {
          req.flash('error', error.details[0].message);
          res.render('students/add', {
              title: 'Add Student',
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              class_no: req.body.class_no
            }
          );
        } else {
          Students.create(req.body)
          .then(Student => {
            if (typeof req.body.subjects !== undefined) {
              Student.setSubjects(req.body.subjects).then(sub => {
                
              });
            }
            req.flash('success', 'Student has been added successfully');
            res.redirect('/students');
          })
          .catch(err => {
            req.flash('error', 'Student could not be added');
            res.redirect('/students');
          });
        }
      }
    });
});

module.exports = router;
