const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PurchasedItems = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  model: {
    type: String,
  },
  battery: {
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
},{_id:true});

const UserRegister = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    landmark: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },

    Purchased: [PurchasedItems],
  },
  { timestamps: true }
);

UserRegister.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
  next();
});

module.exports = mongoose.model("userregister", UserRegister);
