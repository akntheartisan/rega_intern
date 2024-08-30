const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const adminroute = require("./route/AdminRoute");
const userroute = require("./route/UserRoute");
const productroute = require("./route/ProductRoute");
const cartroute = require("./route/CartRoute");
const bucketroute = require("./route/BucketRoute");
const cookieParser = require("cookie-parser");

app.use(express.json()); 
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//routes
app.use("/admin", adminroute);
app.use("/project", productroute);
app.use("/user", userroute);
app.use("/cart", cartroute);
app.use("/bucket", bucketroute);


const mongo_uri =
  "mongodb+srv://mkansha2312:Y81PZ1nahAdVONzX@regakansha.ljpzn.mongodb.net/?retryWrites=true&w=majority&appName=RegaKansha";

mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(4000, () => {
      console.log(`listening to 4000`);
    });
  })
  .catch((err) => console.log(err));
