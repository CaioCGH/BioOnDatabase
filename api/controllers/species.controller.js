const {Species, TaxonomyNode}  = require("../models/species.model");
const {save}  = require("../import/importUtils");

module.exports = {
    getAllSpecies:  async function(req, res){
        const allSpecies = await Species.find().exec();
        res.json(allSpecies);
    },
    getSpecies:  async function(req, res){
        var animal = await Species.findOne({"Nome Científico" : req.query.scientificName}).exec();
        res.json(animal);
    },
    createSpecies:  async function(req, res){
        console.log(req.body.model);
        var species = new Species(req.body.model);
        species['Observações Registradas'] = [];
        save(species);
        res.json(species);
    },
    updateSpecies: async function(req, res){
        const filter = { "_id" : req.body.id};

        const update = req.body.model;
        let result = await Species.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true}).exec();

        res.json(result);
    },
    deleteSpecies: async function(req, res){
        console.log('on delete!', req.body);
        let result = await Species.deleteOne({ "_id" : req.body.id });
        console.log(result);
        res.json(result);
    },
    getTaxonomyTree:  async function(req, res){
        const taxonomyNode = await TaxonomyNode.findOne().exec();
        res.json(taxonomyNode);
    },
}