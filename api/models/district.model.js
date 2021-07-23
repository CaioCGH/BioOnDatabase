const mongoose = require("mongoose");

const District = mongoose.model(
  "District",
  new mongoose.Schema({
    name: String,
    anacronym: String
  })
);

module.exports = District;