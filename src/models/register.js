const mongoose = require("mongoose");

const hospitalMongoose = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
  },
  createpassword: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  ACN: {
    type: Number,
    required: true,
  },
  DOB: {
    type: Date, 
    required: true,
  },
  BG: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("Register", hospitalMongoose);
module.exports = Register;
