var mongoose = require("mongoose");

var payment_method = mongoose.Schema({
  name: String,
  description : String,
});

module.exports = mongoose.model("Payment Method", product);