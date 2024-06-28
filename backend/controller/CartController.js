const mongoose = require("mongoose");
const cartmodel = require("../model/CartModel");
const usermodel = require("../model/UserRegisterModel");
const productmodel = require("../model/ProductsModel");

exports.addCart = async (req, res, next) => {
  const { userId, name, username, address, district, state, pincode, mobile } =
    req.body.userDetails;
  const { productId, total, quantity } = req.body;

  console.log(req.body);

  try {
    const orderPlace = await cartmodel.create({
      userId,
      name,
      username,
      address,
      district,
      state,
      pincode,
      mobile,
      productId,
      total,
      quantity,
    });

    if (orderPlace) {
      return res.status(200).json({
        status: "success",
        message: "order has been placed successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  console.log("getcart");

  try {
    const cart = await cartmodel.find().populate("productId").exec();
    if (cart) {
      return res.status(200).json({
        status: "success",
        data: cart,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
