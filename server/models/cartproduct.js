var mongoose = require("mongoose");

var cartproduct = mongoose.Schema({
  "product id": {
    type: String,
    required: "Must provide Product id",
  },
  "add date": Date,
});

module.exports = mongoose.model("CartProduct", cartproduct);
