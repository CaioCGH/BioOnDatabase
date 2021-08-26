const {Locality, Observation, Observer, Title, District, Affiliation}  = require("../models/locality.model");
const {save}  = require("../import/importUtils");

module.exports = {
    getAllLocalities:  async function(req, res){
        const allLocalities = await Locality.find().exec();
        res.json(allLocalities);
    },
    getLocality:  async function(req, res){
        var locality = await Locality.findOne({"Nome Completo" : req.query.completeName}).exec();
        res.json(locality);
    },
    createLocality:  async function(req, res){
        var locality = new Locality(req.body.model);
        locality['Observações Registradas'] = [];
        save(locality);
        res.json(locality);
    },
    updateLocality: async function(req, res){
        const filter = { "_id" : req.body._id};

        const update = req.body.model;
        let result = await Locality.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true}).exec();

        res.json(result);
    },
    deleteLocality: async function(req, res){
        console.log("deleting", req.body);
        let result = await Locality.deleteOne({ "_id" : req.body._id });
        res.json(result);
    }
}