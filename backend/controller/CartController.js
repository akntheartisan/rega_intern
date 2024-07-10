const mongoose = require("mongoose");
const cartmodel = require("../model/CartModel");
const usermodel = require("../model/UserRegisterModel");
const productmodel = require("../model/ProductsModel");
const razorpay = require("razorpay");
const crypto = require("crypto");

exports.addCart = async (req, res, next) => {
  console.log(req.body);
  const { userId } = req.body.userDetails;

  const { productId, total, quantity, battery, model, paymentMode } = req.body;

  try {
    if (paymentMode === "offline") {

      console.log('offline');
      const orderPlace = await cartmodel.create({
        userId,
        model,
        productId,
        total,
        quantity,
        battery,
      });

      const findUser = await usermodel.findById(userId);
      console.log(findUser);
      if (findUser) {
        const addPurchasedItem = await usermodel.updateOne(
          { _id: userId },
          {
            $push: {
              Purchased: {
                model,
                productId,
                total,
                quantity,
                battery,
              },
            },
          }
        );
      }

      if (orderPlace) {
        return res.status(200).json({
          status: "success",
          message: "order has been placed successfully",
        });
      }
    } else if(paymentMode === 'online'){

      console.log('online');

          const razorPayInstance = new razorpay({
            key_id : "rzp_test_ooBBvuCJO2yhPh",
            key_secret : "Sza1b1bUrEAKO4ITERLLVGYi"
          });

          const options = {
            amount : total * 100,
            currency: "INR",
            receipt : crypto.randomBytes(10).toString("hex")
          };

          razorPayInstance.orders.create(options,(err,order)=>{
            if(err){
              console.log(err);
            }else{
              res.status(200).json({transaction:order});
            }
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
