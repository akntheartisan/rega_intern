const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'userregister',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    battery:{
      type:String
    },
    model:{
      type:String
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
