const express = require("express");
const path = require("path");

const router = express.Router();

const Admin = require("../models/admin");

const validation = async (req, res, next)=>{
  adminName = req.body.name;
  password = req.body.password;
  console.log(adminName, password);
  try{
    const result = await Admin.find({name : adminName,password : password});
    if (result.length) {
      console.log(result)
      res.cookie("name", result[0].name);
      next();
    }
  }
  catch(error){
    console.log(error);
    res.send("Login with correct cradential");
  }
}

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/404.html"));
});

router.post( "/validate", async (req, res) => {
    adminName = req.body.name;
    password = req.body.password;
    console.log(adminName, password);
    try{
      const result = await Admin.find({name : adminName,password : password});
      if (result.length) {
        console.log(result)
        res.cookie("name", result[0].name);
        res.redirect("/");
      }
    }
    catch(error){
      console.log(error);
      res.send("Please login with correct credential");
    }
    res.end();
  }
);

module.exports = router;
