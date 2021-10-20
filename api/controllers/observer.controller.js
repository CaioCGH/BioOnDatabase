import { Observer }  from "../models/locality.model.js";
import {save}  from "../import/importUtils.js";

const controller = {
    findAllObservers:  async function(req, res){
        var observers = await Observer.find().exec();
        var observersMap = {};
        for(let i = 0; i < observers.length; i++){
            observersMap[observers[i]['nome']] = observers[i];
        }
        res.json(observersMap);
    },


    getAllObservers:  async function(req, res){
        const allObservers = await Observer.find().exec();
        res.json(allObservers);
    },
    getObserver:  async function(req, res){
        var observer = await Observer.findOne({"nome" : req.query.name}).exec();
        res.json(observer);
    },
    createObserver:  async function(req, res){
        console.log(req.body.model);
        var observer = new Observer(req.body.model);
        save(observer);
        res.json(observer);
    },
    updateObserver: async function(req, res){
        const filter = { "_id" : req.body._id};

        const update = req.body.model;
        let result = await Observer.findOneAndUpdate(filter, update,{
            new: true,
            upsert: true}).exec();

        res.json(result);
    },
    deleteObserver: async function(req, res){
        let result = await Observer.deleteOne({ "_id" : req.body._id });
        res.json(result);
    }
}

export default controller;