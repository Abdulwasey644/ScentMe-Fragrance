var mongoose = require("mongoose");

var orderDetails = mongoose.Schema({
  orderID :{
    type: Schema.Types.ObjectId,
    ref : "Order"
  },
  productID :{
    type: Schema.Types.ObjectId,
    ref : "Product"
  },
  price : Number,
  discount : Number
});

module.exports = mongoose.model("Order Details", orderDetails);