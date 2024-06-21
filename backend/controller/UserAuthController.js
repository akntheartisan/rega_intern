const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res, next) => {
  const { name, username, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      return res.status(400).json({
        status: "fail",
        error: "Password should be match",
      });
    }

    const exist = await usermodel.findOne({ username });

    if (exist) {
      return res.status(400).json({
        status: "fail",
        error: "Username has already been registered",
      });
    }

    const newuser = await usermodel.create(req.body);

    const JWT_SECRET = "fhsdkfhksdhfjksdhfkjsdhiy";
    const JWT_EXPIRATION = "90d";

    const token = jwt.sign({ id: newuser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    if (newuser) {
        return res.status(200).json({
          status: "success",
          message: "Successfully Created",
        });
      }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
