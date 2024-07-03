const mongoose = require("mongoose");


const SubProduct = new mongoose.Schema({
  battery: {
    type: String,
  },
  motor: {
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
}, { _id: true });

const ProductSchema = new mongoose.Schema(
  {
    image: {
      url: {
        type: String,
      },
      pid: {
        type: String,
      },
    },
    model: {
      type: String,
    },
    SubModel: [SubProduct],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
