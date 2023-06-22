require("dotenv").config();
require("./configs/connect");

// console.log("my name is ",process.env.abcNAME);
const PORT = process.env.PORT||3001;

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const handlebarsHelper = require("handlebars-helpers");
const fileUpload = require("express-fileupload");
const Stripe = require("stripe")(process.env.SECRETKEY);
const nodemailer = require("nodemailer");

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "/public")));

app.engine(
  "hbs",
  handlebars.engine({
    helpers: handlebarsHelper(),
    layoutsDir: path.join(__dirname, "/views/layouts"),
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);

app.set("view engine", "hbs");

const validation = require("./middlewares/login.middleware");

let dashboardDate = {
  title : "Dashboard",
  salesType: "All time",
  salesCount : 0,
  revenueType: "All time",
  revenueCount : 0,
  customerType: "All time",
  customerCount : 0,
}

const Order = require("./models/order")

app.get("/", validation, async(req, res) => {
  const orders = await Order.find();
  dashboardDate.customerCount = orders.length;
  let amount = 0, sales = 0;
  for (let index = 0; index < orders.length; index++) {
    amount = amount + orders[index].amount;
    sales = sales + orders[index]["products"].length
  }
  dashboardDate.revenueCount = amount;
  dashboardDate.salesCount = sales;
  dashboardDate.customerType = "All Time";
  dashboardDate.revenueType = "All Time";
  dashboardDate.salesType = "All Time";
  res.render("main", dashboardDate);
});

app.get("/sales/today", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let sales = 0;
  for (let index = 0; index < orders.length; index++) {
    sales = sales + orders[index]["products"].length
  }
  dashboardDate.salesCount = sales;
  dashboardDate.salesType = "Today"
  res.render("main", dashboardDate);
});

app.get("/revenue/today", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let amount = 0;
  for (let index = 0; index < orders.length; index++) {
    amount = amount + orders[index].amount;
  }
  dashboardDate.revenueCount = amount;
  dashboardDate.revenueType = "Today"
  res.render("main", dashboardDate);
});

app.get("/customer/today", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  dashboardDate.customerCount = orders.length;
  dashboardDate.customerType = "Today"
  res.render("main", dashboardDate);
});

app.get("/sales/month", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let sales = 0;
  for (let index = 0; index < orders.length; index++) {
    sales = sales + orders[index]["products"].length
  }
  dashboardDate.salesCount = sales;
  dashboardDate.salesType = "This Month"
  res.render("main", dashboardDate);
});

app.get("/revenue/month", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let amount = 0;
  for (let index = 0; index < orders.length; index++) {
    amount = amount + orders[index].amount;
  }
  dashboardDate.revenueCount = amount;
  dashboardDate.revenueType = "This Month"
  res.render("main", dashboardDate);
});

app.get("/customer/month", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  dashboardDate.customerCount = orders.length;
  dashboardDate.customerType = "Today"
  res.render("main", dashboardDate);
});

app.get("/sales/year", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), 1 , 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let sales = 0;
  for (let index = 0; index < orders.length; index++) {
    sales = sales + orders[index]["products"].length
  }
  dashboardDate.salesCount = sales;
  dashboardDate.salesType = "This Year"
  res.render("main", dashboardDate);
});

app.get("/revenue/year", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), 1 , 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  let amount = 0;
  for (let index = 0; index < orders.length; index++) {
    amount = amount + orders[index].amount;
  }
  dashboardDate.revenueCount = amount;
  dashboardDate.revenueType = "This Year"
  res.render("main", dashboardDate);
});

app.get("/customer/year", validation, async(req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), 1 , 1);
  const orders = await Order.find({"order date": {$gte: startOfToday}});
  dashboardDate.customerCount = orders.length;
  dashboardDate.customerType = "This Year"
  res.render("main", dashboardDate);
});

app.get("/sales/all", validation, async(req, res) => {
  const orders = await Order.find();
  let sales = 0;
  for (let index = 0; index < orders.length; index++) {
    sales = sales + orders[index]["products"].length
  }
  dashboardDate.salesCount = sales;
  dashboardDate.salesType = "All Time"
  res.render("main", dashboardDate);
});

app.get("/revenue/all", validation, async(req, res) => {
  const orders = await Order.find();
  let amount = 0;
  for (let index = 0; index < orders.length; index++) {
    amount = amount + orders[index].amount;
  }
  dashboardDate.revenueCount = amount;
  dashboardDate.revenueType = "All Time"
  res.render("main", dashboardDate);
});

app.get("/customer/all", validation, async(req, res) => {
  const orders = await Order.find();
  dashboardDate.customerCount = orders.length;
  dashboardDate.customerType = "All Time"
  res.render("main", dashboardDate);
});

app.get("/alerts", (req, res) => {
  if (req.cookies.name == "Admin") {
    res.render("alerts", { title: "Alerts" });
  } else {
    res.redirect("/admin");
  }
});

const Faq = require("./models/faq");

let faq_message = ""
let faq_message_type = ""

app.get("/faq", async (req, res) => {
  const faqs = await Faq.find().lean();
  for (let index = 0; index < faqs.length; index++) {
    faqs[index].index = index + 1;
  }
  res.render("faq", { faqs , message : faq_message , message_type : faq_message_type});
});

app.post("/faq", async (req, res) => {
  try {
    const old = await Faq.find({question : req.body.question, answer : req.body.answer}).lean();
    
    console.log(old)

    if(!old.length){
      const faq = new Faq({
        question: req.body.question,
        answer: req.body.answer
      })
      
      Faq.insertMany(faq)
      faq_message = "Question added successfully...!";
      faq_message_type = "success"
    }
    else{
      faq_message = "Question already added...!";
      faq_message_type = "primary"
    }
    res.redirect("/faq");
  }
  catch (error) {
    console.log(error);
  }
  res.end();
});

app.get("/questions", async (req, res) => {
  try{
    const faqs = await Faq.find().lean();
    res.json(faqs);
  }
  catch(error){
    console.log(error);
  }
  res.end();
});

const Products = require("./models/product");

app.get("/brands", async (req, res) => {
  try{
    const Brands = await Products.find();
    let brands = [];
    for (let index = 0; index < Brands.length; index++) {
      console.log("b", brands ,"=", Brands[index].brand)
      if(!brands.includes(Brands[index].brand)){
        brands.push(Brands[index].brand);
      }
    }

    let updatedbrand = [];
    
    for (let index = 0; index < brands.length; index++) {
      const faqs = await Products.find({brand : brands[index]});
      updatedbrand.push( {brand : brands[index], count : faqs.length});
    }
    res.json(updatedbrand);
  }
  catch(error){
    console.log(error);
  }
  res.end();
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

app.get("/logout", (req, res) => {
  res.clearCookie("name");
  res.redirect("/admin");
});



app.use("/admin", require(path.join(__dirname, "/routes/admin.js")));
app.use("/product", require(path.join(__dirname, "/routes/product.js")));
app.use("/order", require(path.join(__dirname, "/routes/order.js")));
// app.use("/mail" , require(path.join(__dirname, "/routes/mail.js")))
// app.use("/user" , require(path.join(__dirname, "/routes/user.js")))
// app.use("/vendor" , require(path.join(__dirname, "/routes/vendor.js")))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


