const {Species, TaxonomyNode}  = require("../models/species.model");
const { Locality, Observation, Observer, Title, District, Affiliation }  = require("../models/locality.model");
const {save, generateId}  = require("../import/importUtils");
const speciesController = require("./species.controller");

module.exports = {
    getObservationsBySpeciesId:  async function(req, res){
        var species = await Species.findById(req.query._id).exec();
        res.json(species['Observações Registradas']);
    },
    getObservationsByLocalityId:  async function(req, res){
        var locality = await Locality.findById(req.query._id).exec();
        res.json(locality['Observações Registradas']);
    },
    createObservation:  async function(req, res){
        var observation = new Observation(req.body.model);
        //queremos que a aobservação tenha a mesma ID tanto na localidade quanto na espécie; ajuda no update
        observation['_id'] = generateId();
        var species = await Species.findOne({ 'Nome Científico': observation['Nome Científico']}).exec();
        var locality = await Locality.findOne({ 'Nome Completo': observation['Localidade']}).exec();
        
        
        species['Observações Registradas'].push(observation);
        locality['Observações Registradas'].push(observation);
        

        var result = {};
        result['species'] = await Species.findOneAndUpdate({_id: species._id}, species,{
            new: true,
            upsert: true}).exec();
        result['locality'] =  await Locality.findOneAndUpdate({_id: locality._id}, locality,{
            new: true,
            upsert: true}).exec();
        
        res.json(result);
    },
    updateObservation: async function(req, res){
        var observation = new Observation(req.body.model);
        var species = (await Species.findOne({ 'Nome Científico': req.body.model['Nome Científico']}).exec()).toJSON();
        var locality = (await Locality.findOne({ 'Nome Completo': req.body.model['Localidade']}).exec()).toJSON();
        
        for(let i = 0; i < species['Observações Registradas'].length; i++){
            if('' + species['Observações Registradas'][i]._id == observation._id){
                species['Observações Registradas'][i] = observation;
                break;
            }
        }
        for(let i = 0; i < locality['Observações Registradas'].length; i++){
            if('' + locality['Observações Registradas'][i]._id == observation._id){
                locality['Observações Registradas'][i] = observation;
                break;
            }
        }
        locality['Observações Registradas'].push(observation);
        
        var result = {};
        result['species'] = await Species.findOneAndUpdate({_id: species._id}, species,{
            new: true,
            upsert: true}).exec();
        result['locality'] =  await Locality.findOneAndUpdate({_id: locality._id}, locality,{
            new: true,
            upsert: true}).exec();
        res.json(result);
    },
    deleteObservation: async function(req, res){
        var observation = new Observation(req.body.model);
        var species = (await Species.findOne({ 'Nome Científico': req.body.model['Nome Científico']}).exec()).toJSON();
        var locality = (await Locality.findOne({ 'Nome Completo': req.body.model['Localidade']}).exec()).toJSON();
        
        var newSpecies = {};
        var newLocality = {};
        
        newSpecies['Observações Registradas'] = species['Observações Registradas'].filter(obs => '' + obs._id != observation._id);
        newLocality['Observações Registradas'] = locality['Observações Registradas'].filter(obs => '' + obs._id != observation._id);
                
        var result = {};
        result['species'] = await Species.findOneAndUpdate({_id: species._id}, newSpecies,{
            new: true}).exec();
        result['locality'] =  await Locality.findOneAndUpdate({_id: locality._id}, newLocality,{
            new: true}).exec();
        res.json(result);
    }
}