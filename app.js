const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(formidableMiddleware());
app.use("/api/orders", require("./api/orders"));

app.listen(process.env.PORT, () => {
  console.log("Servers is working");

  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.log(err);
    });
});
