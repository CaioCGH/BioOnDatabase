const mongoose = require("mongoose");

const LocalityClassification = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    localities: [String]
  })
);

module.exports = LocalityClassification;