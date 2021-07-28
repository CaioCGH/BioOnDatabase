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
  'nome': String,
  'sigla': String,
  'título': String,
  'vínculo': String,
});
const Observer = mongoose.model("Observer", observer);

const observation = new mongoose.Schema({
  'nome científico': String,
  'nome comum': String,
  'localidade': String,
  'data': String,
  'registro original': String,
  'observadores': [String]
});
const Observation = mongoose.model("Observation", observation);


const district = new mongoose.Schema({
  name: String,
  acronym: String
});

const District = mongoose.model("District", district);


const Locality = mongoose.model(
  "Locality",
  new mongoose.Schema({
    'tipo': String,
    'sheetId': Number,
    'nome planilha': String,
    'nome completo': String,
    'UTMX': String,
    'UTMY': String,
    'endereço': String,
    'distrito': String,
    'Observações registradas': [observation],
  })
);

module.exports = { Locality, Observation, Observer, Title, District, Affiliation, observation };
