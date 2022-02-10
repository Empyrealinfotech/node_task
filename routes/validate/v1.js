const Joi = require('joi');
var config = require('../../config/config');
const db = require("../../config/mysql.connection");
const Auth = db.auth;


getStudents = (req, res, next) => {

  /** Validate Request Params */
  // fetch the request data
  const data = { field: req.body.field };

  // define the validation schema
  const schema = Joi.object({
    field: Joi.string().required()
  });

  // validate the request data against the schema
  const { error, value } = schema.validate(data);
  if (error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      status: config.status_zero,
      message: error.details[0].message
    });
  } else {
    let fields = data.field.split(',');
    let checked = fields.filter((field) => !/^[a-zA-Z\_.]+$/.test(field));
    if (checked.length > 0) {
      return res.status(422).json({
        status: config.status_zero,
        message: 'invalid character in fields'
      });
    }
    next();
  }
}


const validateInfo = {};
validateInfo.getStudents = getStudents;

module.exports = validateInfo;