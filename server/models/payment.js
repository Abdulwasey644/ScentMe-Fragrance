var mongoose = require("mongoose");

var payment = mongoose.Schema({
    "payment method" : "String",
    "transaction type": {
        type : Schema.Type.ObjectId,
        ref : "Transaction"
    },
    orderID: {
        type : Schema.Type.ObjectId,
        ref : "Order"
  },
  "payment date" : Date
});

module.exports = mongoose.model("Payment", student);