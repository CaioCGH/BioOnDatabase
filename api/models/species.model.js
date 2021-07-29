const mongoose = require("mongoose");
const { observation } = require('../models/locality.model');

const Species = mongoose.model(
  "Species",
  new mongoose.Schema({
    'Nome Científico': String,
    'Nome Comum': String,
    'Taxonomia': Object,
    'Biologia': Object,
    'Estado de Conservação': Object,
    'Observações Registradas': [observation]
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
