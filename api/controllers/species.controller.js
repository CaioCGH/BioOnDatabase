import {Species, TaxonomyNode}  from "../models/species.model.js";
import {save}  from "../import/importUtils.js";

const controller  = {
    getAllSpecies:  async function(req, res){
        const allSpecies = await Species.find().exec();
        res.json(allSpecies);
    },
    getSpecies:  async function(req, res){
        var animal = await Species.findOne({"Nome Científico" : req.query.scientificName}).exec();
        res.json(animal);
    },
    createSpecies:  async function(req, res){
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
        let result = await Species.deleteOne({ "_id" : req.body.id });
        res.json(result);
    },
    getTaxonomyTree:  async function(req, res){
        const taxonomyNode = await TaxonomyNode.findOne().exec();
        res.json(taxonomyNode);
    },
}

export default controller;