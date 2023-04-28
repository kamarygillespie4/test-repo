// Importing Modules
var MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var username = "admin1";
var password = "admin1";
var hosts =
  "iad2-c14-2.mongo.objectrocket.com:53048,iad2-c14-0.mongo.objectrocket.com:53048,iad2-c14-1.mongo.objectrocket.com:53048";
var database = "test";
var options = "?replicaSet=d66ef1a161e94eb583d5c2dacd0d31f4";
var connectionString =
  "mongodb://" +
  username +
  ":" +
  password +
  "@" +
  hosts +
  "/" +
  database +
  options;
const routes = require("./routes");

MongoClient.connect(connectionString, function (err, db) {
  if (db) {
    db.close();
  }
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Connected!");
    process.exit();
  }
});

// importing files

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1

// Step 2

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});
