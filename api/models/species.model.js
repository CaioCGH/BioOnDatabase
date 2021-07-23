const mongoose = require("mongoose");

const Species = mongoose.model(
  "Species",
  new mongoose.Schema({
    scientificName: String,
    commonName: String,
    taxonomy: {
        type: Map,
        of: String
    },
    biology:{
        type: Map,
        of: String
    },
    concernStatus:{
        type: Map,
        of: String
    }
  })
);

module.exports = Species;