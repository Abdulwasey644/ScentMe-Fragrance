var mongoose = require("mongoose");

var product = mongoose.Schema({
  name: String,
  brand: String,
  // {
  //   ref : "Brand"
  // },
  type: {
    type: String,
    enum: [
      "Parfum",
      "Eau de Parfum",
      "Eau de Toilette",
      "Eau de Cologne",
      "Eau Fraiche",
      "Perfume Oil"
    ]
  },
  gender: { type: String, lowercase: true, enum: ["male", "female", "unisex"] },
  size: Number,
  "size unit" : String,
  image : String,
  quantity : Number,
  "cost price": Number,
  "new price": Number,
  "old price": Number,
  description: String,
  "add date" :Date,
  "update date" :Date
});

product.index({ brand: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Product", product);