const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    userId:{
      type:String
    },
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
    mobile:{
      type:String
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
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
