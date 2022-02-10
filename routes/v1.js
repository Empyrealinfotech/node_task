const express = require('express');
const router = express.Router();
const multer = require('multer');

const validateInfo = require('./validate/v1');

const StudentsController = require('../controllers/v1/students.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } });
});

var storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/profile_pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
  }
})
var uploadProfilePicture = multer({ storage: storageProfile });


//** Routes for Auth Actions */
// router.post('/auth/sign_up', uploadProfilePicture.single('profile_picture'), [validateInfo.signUp], StudentsController.getStudents);
router.post('/get/students',  [validateInfo.getStudents], StudentsController.getStudents);


module.exports = router;