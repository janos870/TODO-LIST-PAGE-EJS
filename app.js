//jshint esversion:6

const gi = require(`gitignore`);
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const api = require("./api");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

api(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Server started on port 3000");
});
