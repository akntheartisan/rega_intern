const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const adminroute = require('./route/AdminRoute');
const userroute = require('./route/UserRoute');
const productroute = require('./route/ProductRoute');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));


//admin routes
app.use("/admin",adminroute);
app.use("/project",productroute);

//frontend routes
app.use("/user",userroute);

const mongo_uri =
  "mongodb+srv://aravinthkumaran410:iRPBg1ArJBqv3ayN@cluster0.2eiliwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(4000, () => {
      console.log(`listening to 4000`);
    });
  })
  .catch((err) => console.log(err));
