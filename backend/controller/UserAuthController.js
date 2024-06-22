const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "fhsdkfhksdhfjksdhfkjsdhiy";
const JWT_EXPIRATION = "90d";

exports.userSignUp = async (req, res, next) => {
  const { name, username, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      return res.status(400).json({
        status: "fail",
        error: "Passwords should match",
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

    const token = jwt.sign({ id: newuser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    if (newuser) {
      return res.status(200).cookie("token", token, { httpOnly: true }).json({ newuser });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  console.log('req.cookies.jwt:', req.cookies.jwt);

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not authenticated",
    });
  }

  try {
    
    let decoded = jwt.verify(token, JWT_SECRET);

    const checkUser = await usermodel.findById(decoded.id);

    console.log(checkUser);

    if (!checkUser) {
      return res.status(401).json({
        status: "fail",
        message: "This user is no longer exists",
      });
    }

    req.user = checkUser;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({
      status: "fail",
      message: "Token verification failed",
    });
  }
};
