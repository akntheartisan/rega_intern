const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "fhsdkfhksdhfjksdhfkjsdhiy";
const JWT_EXPIRATION = "1hr";
const sendMail = require('../Utility/Mail');
const crypto = require("crypto");

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

    const newuser = await usermodel.create({
      name,
      username,
      password,
      confirmpassword,
    });

    // const newuserId = newuser._id;

    // const userprofile = await userprofilemodel.save(newuserId);

    const token = jwt.sign({ id: newuser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    if (newuser) {
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json({ newuser });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userSignIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUser = await usermodel.findOne({ username }).select("+password");

    //console.log(checkUser);

    if (!checkUser) {
      return res.status(400).json({
        status: "fail",
        error: "Invalid Username",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        error: "Incorrect password.Please try again",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ checkUser });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  //console.log("req.cookies.jwt:", req.cookies.jwt);

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

    //console.log(checkUser);

    if (!checkUser) {
      return res.status(401).json({
        status: "fail",
        message: "This user is no longer exists",
      });
    }

    req.user = checkUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({
      status: "fail",
      message: "Token verification failed",
    });
  }
};

exports.profileUpdate = async (req, res, next) => {
  const { id, mobile, address, landmark, district, state, pincode } = req.body;

  try {
    const profileData = await usermodel.findByIdAndUpdate(
      id,
      { mobile, address, landmark, district, state, pincode },
      { new: true }
    );
    return res.status(200).json({ profileData });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.profileUpdate = async (req, res, next) => {
  const { id, mobile, address, landmark, district, state, pincode } = req.body;

  try {
    const profileData = await usermodel.findByIdAndUpdate(
      id,
      { mobile, address, landmark, district, state, pincode },
      { new: true }
    );
    return res.status(200).json({ profileData });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getProfileData = async (req, res, next) => {
  //console.log(req.query.id);
  try {
    const getProfileData = await usermodel.findById(req.query.id);
    req.profile = getProfileData;
    next();
  } catch (error) {
    //console.log(error);
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const deletedAccount = await usermodel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { mail } = req.body;
  console.log(mail);

  try {
    const user = await usermodel.findOne({ username: mail });
    console.log(user);

    if (!user) {
      res.status(402).json({
        status: "fail",
        message: "there is no user for this mail",
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const url = `http://localhost:3000/users/resetPassword/${resetToken}`;
    const message = `this is the password reset link ${url} /n click here.`;

    await sendMail({
      email: user.username,
      subject: "your password reset message",
      message: message,
    });

    res.status(200).json({
      status:"success",
    })


  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (req,res,next)=>{
  const {password,resetToken} = req.body;
  console.log(password,resetToken);

  const encryptedToken =  crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  console.log(encryptedToken);
try {
  const user = await usermodel.findOne({passwordResetToken:encryptedToken});
  console.log(user);
  if(user){
    user.password = password;
    await user.save();

    res.status(200).json({
      status:'success'
    })
  }
} catch (error) {
  console.log(error);
}
 
}
