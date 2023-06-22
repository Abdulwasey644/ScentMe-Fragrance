var mongoose = require("mongoose");

var StudentSchema = mongoose.Schema({
    transactionID : String,
    user : {
        name : String,
        email : String,
        address : String
    },
    products : [{id : String, quantity : String}],
    amount : Number,
    "order date" : Date,
    "delivery date" : Date,
    isDelivered : Boolean,
});

module.exports = mongoose.model("order", StudentSchema, "Order");
// user: {
//     type: Schema.Types.ObjectId,
//     ref : "User"
// },
// "purchase date" : Date,
// "deliver date" : Date,
// "order status" : {
//     type : String,
//     enum : ["Pending payment",
//         "Failed",
//         "Processing",
//         "Completed",
//         "On hold",
//         "Canceled",
//         "Refunded",
//         "Authentication required",
//         "Checkout draft" ]
// },
// "billing address" : String,
// "shipping address" : String,
// "remaining days" : Number,
// "is taxable" : Boolean,
// notes: String
