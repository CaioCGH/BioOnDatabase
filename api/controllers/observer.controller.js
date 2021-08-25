const {Species, TaxonomyNode}  = require("../models/species.model");
const { Locality, Observation, Observer, Title, District, Affiliation }  = require("../models/locality.model");
const {save, generateId}  = require("../import/importUtils");
const speciesController = require("./species.controller");

module.exports = {
    findAllObservers:  async function(req, res){
        var observers = await Observer.find().exec();
        var observersMap = {};
        for(let i = 0; i < observers.length; i++){
            console.log(observers[i]);
            console.log(observers[i]['nome']);
            observersMap[observers[i]['nome']] = observers[i];
        }
        res.json(observersMap);
    }
}