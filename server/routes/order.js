const express = require("express");
const router = express.Router();
const path = require("path");
const Stripe = require("stripe")(process.env.SECRETKEY);
const nodemailer = require("nodemailer");
const validation = require("../middlewares/login.middleware");

const Order = require("../models/order");
const CartProduct = require("../models/cartproduct");
const Product = require("../models/product");
const product = require("../models/product");

router.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/orderSuccess.html"));
});

router.get("/order-placed", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/orderSuccess.html"));
});

router.get("/", validation, async (req, res) => {
  const message = "";
  const message_type = "";

  const results = await Order.find().lean();
  for (var i = 0; i < results.length; i++) {
    results[i]["index"] = i + 1;
    let arrayList = []
    for (let index = 0; index < results[i]["products"].length; index++) {
      let res = await Product.findById(results[i]["products"][index].id)
      arrayList.push(res.name)
    }
    results[i]["products"] = arrayList;
    results[i].isDelivered =
      new Date() < results[i]["delivery date"] ? false : true;
  }

  res.render("order", {
    title: "Orders",
    message: message,
    "message type": message_type,
    items: results,
  });
});

router.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount, products } = req.body;
  // console.log("products", products);
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "pkr",
    });
    status = "success";
    // console.log("order", products);
    const list = [];
    for (let i = 0; i < products.length; i++) {
      list.push({
        id: products[i]._id,
        quantity:
          products[i].quantity - products[i].total / products[i]["new price"],
      });
      removeFromCart(products[i]._id);
      decreaseQuantity(
        products[i]._id,
        products[i].quantity - products[i].total / products[i]["new price"]
      );
    }
    console.log("list", list);
    addOrder(
      list,
      token.id,
      token.card.name,
      token.email,
      token.card.address_line1,
      amount / 100
    );
    mail(
      token.id,
      token.card.name,
      token.card.address_line1,
      token.email,
      amount / 100
    );
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});

const addOrder = async (
  list,
  transactionId,
  userName,
  userEmail,
  userAddress,
  total
) => {
  const now = new Date();
  now.setDate(now.getDate() + 3);
  const newOrder = new Order({
    transactionID: transactionId,
    user: {
      name: userName,
      email: userEmail,
      address: userAddress,
    },
    products: list,
    amount: total,
    "order date": new Date(),
    "delivery date": now,
    isDelivered: false,
  });
  
  try {
    const result = await Order.insertMany(newOrder);
    console.log("order", result);
  } catch (err) {
    console.log(err);
  }
};

const removeFromCart = async (id) => {
  const deleteItem = {
    "product id": id,
  };

  try {
    const result = await CartProduct.findOneAndDelete(deleteItem);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const decreaseQuantity = async (id, quantity) => {
  const updatedproduct = {
    quantity: quantity,
  };

  try {
    let result = await Product.findOneAndUpdate({ _id: id }, updatedproduct, {
      returnNewDocument: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const mail = (transactionId, name, address, email, amount) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
auth: {
        user: 'abdulwasey657@gmail.com',
        pass: 'eqexqxuynrunxukz'
    }
  });
  // send mail with defined transport object
  transporter.sendMail(
    {
      from: "adbulwasey657@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Order pLaced successfully", // Subject line
      // text: "Hi ''!", // plain text body
      html: `<p>Hi ${name}!<br></p><div style="padding-left : 20px">Your order has been placed successfully against transaction id <b>${transactionId}</b>.<br>We thank you to buy perfumes from us for Rs. <b>${amount}</b><br>Your product will reach you with in 3 working days on location : <b>${address}</b></div><br><br>We hope you enjoy our services. Keep visiting our website and buy products in best price.<br><br><b>Thanks & Regards</b>`, // html body
    },
    (error, info) => {
      error ? console.log(error) : console.log("Email sent : " + info.response);
    }
  );
};

module.exports = router;
