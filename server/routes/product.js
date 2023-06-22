const { Console } = require("console");
const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");

const validation = require("../middlewares/login.middleware");
// const product = require("../models/product");
const Product = require("../models/product");
const WishProduct = require("../models/wishproduct");
const CartProduct = require("../models/cartproduct");

router.get("/add", validation, (req, res) => {
  const message = req.cookies.message;
  const message_type = req.cookies.message_type;
  res.clearCookie("message");
  res.clearCookie("message_type");

  res.render("add", {
    title: "Add Product",
    message: message,
    message_type: message_type,
  });
});

router.post("/new", validation, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let image = req.files.image;
  const uploadPath = path.join(
    __dirname,
    "../public/img/perfumes/" +
      req.body.brand +
      "." +
      req.body.name +
      image.name.substring(image.name.length - 4)
  );

  image.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    type: req.body.type,
    gender: req.body.gender,
    size: req.body.size,
    "size unit": req.body.size_unit,
    quantity: req.body.quantity,
    "cost price": req.body.cost_price,
    "new price": req.body.price,
    "old price": req.body.price,
    image:
      req.body.brand +
      "." +
      req.body.name +
      image.name.substring(image.name.length - 4),
    description: req.body.description,
    "add date": new Date(),
    "update date": new Date(),
  });
  try {
    let result = await Product.find({
      brand: product.brand,
      name: product.name,
    });
    if (result.length) {
      res.cookie("message_type", "warning");
      res.cookie("message", "Product with in this brand already exist ...!");
    } else {
      Product.insertMany(product);
      res.cookie("message_type", "success");
      res.cookie("message", "Product added succesfully...!");
    }
  } catch (err) {
    console.log(err);
    res.cookie("message_type", "danger");
    res.cookie("message", "Something Went Wrong...!");
  }
  res.redirect("/product/add");
});

router.get("/edit", validation, async (req, res) => {
  const message = req.cookies.message;
  const message_type = req.cookies.message_type;
  res.clearCookie("message");
  res.clearCookie("message_type");

  const products = await Product.find().lean();
  for (var i = 0; i < products.length; i++) {
    products[i]["index"] = i + 1;
  }

  res.render("edit", {
    title: "Edit Product",
    message: message,
    "message type": message_type,
    items: products,
  });
});

router.post("/edit", validation, async (req, res) => {
  let image_name = req.body.old_image;
  if (
    req.files &&
    Object.keys(req.files).length &&
    req.files.image.name !== req.body.old_image
  ) {
    const fs = require("fs");
    const deletePath = path.join(
      __dirname,
      "../public/img/perfumes/" + req.body.old_image
    );

    fs.unlink(deletePath, (err) => {
      if (err) {
        console.log("File not exist...");
      } else {
        console.log("Delete File successfully.");
      }
    });

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    image = req.files.image;
    image_name =
      req.body.brand +
      "." +
      req.body.name +
      image.name.substring(image.name.length - 4);
    const uploadPath = path.join(
      __dirname,
      "../public/img/perfumes/" + image_name
    );

    image.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }

  const updatedproduct = {
    name: req.body.name,
    brand: req.body.brand,
    type: req.body.type,
    gender: req.body.gender,
    size: req.body.size,
    "size unit": req.body.size_unit,
    quantity: req.body.quantity,
    "cost price": req.body.cost_price,
    "new price": req.body.new_price,
    "old price": req.body.old_price,
    image: image_name,
    description: req.body.description,
    "update date": new Date(),
  };

  try {
    let result = await Product.findOneAndUpdate(
      { _id: req.body.id },
      { $set: updatedproduct },
      {
        returnNewDocument: true,
      }
    );
    if (result) {
      res.cookie("message_type", "success");
      res.cookie("message", "Product updated succesfully...!");
    } else {
      res.cookie("message_type", "warning");
      res.cookie("message", "Product donot update successfully...!");
    }
  } catch (err) {
    console.log(err);
    res.cookie("message_type", "danger");
    res.cookie("message", "Something Went Wrong...!");
  }
  res.redirect("/product/edit");
});

router.get("/delete", validation, async (req, res) => {
  const message = req.cookies.message;
  const message_type = req.cookies.message_type;
  res.clearCookie("message");
  res.clearCookie("message_type");

  const products = await Product.find().lean();
  for (var i = 0; i < products.length; i++) {
    products[i]["index"] = i + 1;
  }

  res.render("delete", {
    title: "Delete Product",
    message: message,
    "message type": message_type,
    items: products,
  });
  // res.render("delete", {title : "Delete Product", message : "Product Deleted Successfully"});
});

router.post("/delete", validation, async (req, res) => {
  try {
    let result = await Product.findByIdAndDelete(req.body.id);
    if (result) {
      const fs = require("fs");
      const deletePath = path.join(
        __dirname,
        "../public/img/perfumes/" + result.image
      );

      fs.unlink(deletePath, (err) => {
        if (err) {
          console.log("File not exist...");
        } else {
          console.log("Delete File successfully.");
        }
      });
      res.cookie("message_type", "success");
      res.cookie("message", "Product deleted succesfully...!");
    } else {
      res.cookie("message_type", "warning");
      res.cookie("message", "Product not existed in database...!");
    }
  } catch (err) {
    console.log(err);
    res.cookie("message_type", "danger");
    res.cookie("message", "Something Went Wrong...!");
  }
  res.redirect("/product/delete");
});

router.get("/view", validation, async (req, res) => {
  const products = await Product.find().lean();
  for (var i = 0; i < products.length; i++) {
    products[i]["index"] = i + 1;
    if (products[i]["gender"] === "unisex") {
      products[i]["gender"] = "both male and female";
    }
  }
  res.render("view", { title: "View Product", items: products });
});

router.get("/api", async (req, res) => {
  try {
    const products = await Product.find().lean();
    // console.log("api", products);

    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      const result = await WishProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["wish"] = result.length ? true : false;
      const result2 = await CartProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["cart"] = result2.length ? true : false;
    }

    res.json(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/api/:id", async (req, res) => {
  try {
    let querry = {};
    querry = {
      _id: mongoose.Types.ObjectId(req.params.id),
    };
    console.log(querry);

    const products = await Product.find(querry).lean();
    // console.log("api", products);

    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      const result = await WishProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["wish"] = result.length ? true : false;
      const result2 = await CartProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["cart"] = result2.length ? true : false;
    }

    res.json(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/api/type/:type", async (req, res) => {
  console.log("/api/type/:type?");
  try {
    let querry = {};
    if (
      req.params.type === "male" ||
      req.params.type === "female" ||
      req.params.type === "unisex"
    ) {
      querry.gender = req.params.type;
    }
    if (req.params.type === "< 25000") {
      querry["new price"] = { $lt: 25000 };
    } else if (req.params.type === ">= 25000") {
      querry["new price"] = { $gte: 25000 };
    }

    console.log("querry", querry);

    const products = await Product.find(querry).lean();
    console.log("api", products);

    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      const result = await WishProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["wish"] = result.length ? true : false;
      const result2 = await CartProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["cart"] = result2.length ? true : false;
    }

    res.json(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/api/value/:value?", async (req, res) => {
  console.log(req.params.value);
  try {
    let querry = {};
    // querry.name = new RegExp(["^", req.params.value, "$"].join(""), "i");
    querry.name = new RegExp(req.params.value, "i");
    // querry.brand = new RegExp(["^", req.params.value, "$"].join(""), "i");
    querry.brand = new RegExp(req.params.value, "i");

    console.log("querry", querry);

    const products = await Product.find({ $or:[ {name:querry.name}, {brand:querry.brand} ]}).lean();
    console.log("api", products);

    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      const result = await WishProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["wish"] = result.length ? true : false;
      const result2 = await CartProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["cart"] = result2.length ? true : false;
    }

    res.json(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/api/type/:type/value/:value?", async (req, res) => {
  console.log("/api/type/:type/value/:value?");
  try {
    let querry = {};
    querry.name = new RegExp(req.params.value, "i");
    querry.brand = new RegExp(req.params.value, "i");
    if (
      req.params.type === "male" ||
      req.params.type === "female" ||
      req.params.type === "unisex"
    ) {
      querry.gender = req.params.type;
    }
    if (req.params.type === "< 25000") {
      querry["new price"] = { $lt: 25000 };
    } else if (req.params.type === ">= 25000") {
      querry["new price"] = { $gte: 25000 };
    }

    console.log("querry", querry);

    const products = await Product.find({$and: [
      { $or: [{name:querry.name}, {brand:querry.brand}] },
      { $or: [{"new price": querry["new price"]}, {gender: querry["gender"]} ]}
    ]}).lean();
    // console.log("api", products);

    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      const result = await WishProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["wish"] = result.length ? true : false;
      const result2 = await CartProduct.find({
        "product id": products[i]._id.valueOf(),
      }).lean();
      products[i]["cart"] = result2.length ? true : false;
    }

    res.json(products);
  } catch (error) {
    res.send(error);
  }
});

router.post("/wishlist/add", async (req, res) => {
  const newWishItem = new WishProduct({
    "product id": req.body.id,
    "add date": new Date(),
  });

  try {
    let result = await WishProduct.find({ "product id": req.body.id });
    console.log(result.length);
    if (result.length === 0) {
      const x = await WishProduct.insertMany(newWishItem);
      console.log(x);
    }
  } catch (err) {
    console.log(err);
  }
  res.send(req.params);
});

router.post("/wishlist/delete", async (req, res) => {
  const deleteItem = {
    "product id": req.body.id,
  };
  console.log(deleteItem);
  try {
    const result = await WishProduct.findOneAndDelete(deleteItem);
    console.log("delete/wishlist", result);
  } catch (err) {
    console.log(err);
  }
  res.send(req.params);
});

router.get("/wishlist/api", async (req, res) => {
  try {
    const result = await WishProduct.find().lean();
    console.log("wish ist", result);

    const ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push(result[i]["product id"]);
    }
    console.log(ids);
    const products = await Product.find({ _id: { $in: ids } }).lean();
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      products[i]["wish"] = true;
    }

    res.json(products);
  } catch {
    res.end("Error");
  }
});

router.post("/cart/add", async (req, res) => {
  const newCartItem = new CartProduct({
    "product id": req.body.id,
    "add date": new Date(),
  });

  try {
    let result = await CartProduct.find({ "product id": req.body.id });
    console.log(result.length);
    if (result.length === 0) {
      const x = await CartProduct.insertMany(newCartItem);
      console.log(x);
    } else {
      console.log("product already exist");
    }
  } catch (err) {
    console.log(err);
  }
  res.send(req.params);
});

router.post("/cart/delete", async (req, res) => {
  const deleteItem = {
    "product id": req.body.id,
  };
  console.log(deleteItem);
  try {
    const result = await CartProduct.findOneAndDelete(deleteItem);
    console.log("delete/cart", result);
  } catch (err) {
    console.log(err);
  }
  res.send(req.params);
});

router.get("/cart/api", async (req, res) => {
  try {
    const result = await CartProduct.find().lean();
    console.log("api/cart", result);

    const ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push(result[i]["product id"]);
    }
    console.log(ids);
    const products = await Product.find({ _id: { $in: ids } }).lean();
    for (let i = 0; i < products.length; i++) {
      products[i]["image"] =
        "http://localhost:3001/static/img/perfumes/" + products[i]["image"];
      products[i]["cart"] = true;
    }
    console.log("api/cart", products);

    res.json(products);
  } catch {
    res.end("Error");
  }
});

module.exports = router;
