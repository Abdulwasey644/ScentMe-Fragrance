var mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var user = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: "User name is required",
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    index: false,
    trim: true,
    lowercase: true,
    required: "Password is required",
  },
  "mobile no": String,
  address: String,
  "is login": Boolean,
  "last login": Date,
  "last logout": Date,
  "acount created": Date,
  "last update": Date,
});

module.exports = mongoose.model("User", user);
