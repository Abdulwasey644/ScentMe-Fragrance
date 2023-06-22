var mongoose = require("mongoose");

var wishproduct = mongoose.Schema({
  "product id": {
    type: String,
    required: "Must provide Product id",
  },
  "add date": Date,
});

module.exports = mongoose.model("WishProduct", wishproduct);
