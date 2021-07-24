const mongoose = require("mongoose");

const title = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

const Title = mongoose.model("Title", title);

const affiliation = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

const Affiliation = mongoose.model("Affiliation", affiliation);

const observer = new mongoose.Schema({
  name: String,
  title: title,
  anacronym: String,
  affiliation: affiliation,
});
const Oberserver = mongoose.model("Oberserver", observer);

const observation = new mongoose.Schema({
  species: {
    scientificName: String,
    commonName: String,
  },
  Date: Date,
  Observer: [observer],
});
const Observation = mongoose.model("Observation", observation);


const district = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

const District = mongoose.model("District", district);


const Locality = mongoose.model(
  "Locality",
  new mongoose.Schema({
    sheetId: Number,
    sheetName: String,
    completeName: String,
    taxonomy: Map,
    biology: Map,
    concernStatus: Map,
    UTMX: Number,
    UTMY: Number,
    District: district,
    Address: String,
    RegisteredObservations: [observation],
  })
);

module.exports = { Locality, Observation, Oberserver, Title, District, Affiliation };
