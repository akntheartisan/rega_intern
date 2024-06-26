const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    image: {
      url: {
        type: String,
      },
      pid: {
        type: String,
      },
    },
    model:{
        type:String
    },
    motor: {
      type: String,
    },
    battery: {
      type: String,
    },
    range: {
      type: String,
    },
    tyresize: {
      type: String,
    },
    brakes: {
      type: String,
    },
    ground: {
      type: String,
    },
    payload: {
      type: String,
    },
    chargingtime: {
      type: String,
    },
    frame: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", Product);
