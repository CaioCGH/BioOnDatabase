const {Species, TaxonomyNode}  = require("../models/species.model");

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
        var species = new Species(res.body.model);
        save(species);
        res.json(species);
    },
    updateSpecies: async function(req, res){
        const filter = { "_id" : req.body.id};
        const update = req.body.model;
        let result = await Species.findOneAndUpdate({filter, update,
            new: true,
            upsert: true}).exec();
        res.json(result.lastErrorObject.updatedExisting);
    },
    deleteSpecies: async function(req, res){
        console.log('on delete!', req.body);
        let result = await Species.deleteOne({ "_id" : req.body.id });
        console.log(result);
        res.json(result);
    }
}