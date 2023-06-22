var mongoose = require("mongoose");

var brand = mongoose.Schema({
  name: String,
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Brand", brand);
