var mongoose = require("mongoose");

var faq = mongoose.Schema({
  question: {
    type: String,
    require: "Question is required",
  },
  answer: {
    type: String,
    required: "Answer is required",
  },
});

module.exports = mongoose.model("Faq", faq);