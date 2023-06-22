var mongoose = require("mongoose");

var transaction = mongoose.Schema({
  type: {type : String,
    enum : ["sale", "purchase", "receipt", "payment"]
    },
  description : String,
});

module.exports = mongoose.model("Transaction", transaction);