// const bcrypt = require("bcrypt");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
// const { body, validationResult } = require("express-validator");
const getMe = async (req, res) => {
  const userId = req.admin.userId;
  const admin = await Admin.findById(userId);
  if (admin) {
    res.status(200).json({
      message: "Found",
      admin,
    });
  } else {
    res.status(400).json({
      message: "Bad request",
    });
  }
};
module.exports = getMe;