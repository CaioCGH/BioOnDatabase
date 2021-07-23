const mongoose = require("mongoose");

const Locality = mongoose.model(
  "Locality",
  new mongoose.Schema({
    sheetId: Number,
    sheetName: String,
    completeName: String,
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
    },
    UTMX: Number,
    UTMY: Number,
    District: {
      name: String,
      anacronym: String
    },
    Address: String,
    Observations: [Observation]
  })
);

const Observation = mongoose.model(
  "Observation",
  new mongoose.Schema({
    species: {
      scientificName: String,
      commonName: String
    },
    Date: Date,
    Observer: [Observer]
  })
);

const Oberserver = mongoose.model(
  "Oberserver",
  new mongoose.Schema({
    name: String,
    title: Title,
    anacronym: String,
    affiliation: Affiliation
  })
);

const Title = mongoose.model(
  "Oberserver",
  new mongoose.Schema({
    name: String,
    abbreviation: String
  })
);

const Affiliation = mongoose.model(
  "Oberserver",
  new mongoose.Schema({
    name: String,
    abbreviation: String
  })
);


module.exports = {Locality, Observation,Oberserver,Title, Affiliation  };