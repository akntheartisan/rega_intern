const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
