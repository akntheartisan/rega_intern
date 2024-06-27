const mongoose = require("mongoose");
const cartmodel = require("../model/CartModel");
const usermodel = require("../model/UserRegisterModel");
const productmodel = require("../model/ProductsModel");

exports.addCart = async (req, res, next) => { 
    console.log('addcart:' + req.body);
//   const { userId, productId, total, quantity } = req.body;
  try {
    console.log( req.body);
  } catch (error) {
    console.log(error);
  }
};
