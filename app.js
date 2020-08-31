const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//! Import this
const userRoutes = require("./api/routes/users");

mongoose.connect(
  "mongodb+srv://kareem__ismail:" +
    process.env.mongo_atlas_password +
    "@kluster.5zqmk.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true}
);

app.use(morgan("dev"));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//* CORS error handling
app.use((req, res, next) => {
  //? The '*' means allow all types
  //? If you would put a website url instead of * then that would restrict access to this API to only that website
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
//! Also add this
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    error: {
      message: error.message,
    },
  });
});

//here we export the app fucntion.
module.exports = app;
