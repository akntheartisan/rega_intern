const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username:{
      type:String
    },
    address:{
      type:String
    },
    district:{
      type:String
    },
    state:{
      type:String
    },
    pincode:{
      type:String
    },
    productid: {
      type: String,
    },
    total: {
      type: String,
    },
    quantity: {
      type: String,
    },
    deliverystatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartdetails", Cart);
