const mongoose = require("mongoose");

const Species = mongoose.model(
  "Species",
  new mongoose.Schema({
    scientificName: String,
    commonName: String,
    taxonomy: Object,
    biology: Object,
    concernStatus: Object,
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
