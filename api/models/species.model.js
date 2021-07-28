const mongoose = require("mongoose");
const { observation } = require('../models/locality.model');

const Species = mongoose.model(
  "Species",
  new mongoose.Schema({
    'Nome científico': String,
    'Nome comum': String,
    'Taxonomia': Object,
    'Biologia': Object,
    'Estado de conservação': Object,
    'Observações registradas': [observation]
  })
);

const taxonomyNode = new mongoose.Schema({
  name: String,
  levelName: String,
});
taxonomyNode.add({
  children: [taxonomyNode],
});

const TaxonomyNode = mongoose.model("TaxonomyNode", taxonomyNode);

module.exports = { Species, TaxonomyNode };
