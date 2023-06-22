var mongoose = require("mongoose");

var admin = mongoose.Schema({
  name: {
    type: String,
    require: "Admin name is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
});

module.exports = mongoose.model("Admin", admin);