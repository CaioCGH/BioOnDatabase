const db = require("../models");
const {Species, TaxonomyNode}  = require("../models/species.model");
const {Locality}  = require("../models/locality.model");

module.exports = {
    bioOnlineColumns:  async function(req, res){
        const anySpecies = await Species.findOne({'Nome científico':"Anodontites sp."}).exec();
            res.json(anySpecies);
    },
    generaSpeciesCommonNames:  async function(req, res){
        const root = await TaxonomyNode.findOne({'name':"Animalia"}).exec();
        const allGenera = findAllGeneraToMap(root);
                
        const allSpecies = await Species.find().exec();
        const allCommonNames = allSpecies.map(species => species['Nome comum']);
        res.json({genera: allGenera, commonNames: allCommonNames});
    },
    localities:  async function(req, res){
        const localities = await Locality.find().exec();
        res.json(localities.map(locality => locality['nome completo']));
    },
}

function findAllGeneraToMap(node){
    if(node.levelName == 'Gênero'){
        dict  = {}
        dict[node['name']] = node; 
        return dict;
    }
    let genera = {};
    for(let i = 0; i < node.children.length; i++){
        genera = {...genera, ...findAllGeneraToMap(node.children[i])};
    }
    return genera;
}


function findAllGenera(node){
    if(node.levelName == 'Gênero'){
        return [node];
    }
    let genera = [];
    for(let i = 0; i < node.children.length; i++){
        genera.push(...findAllGenera(node.children[i]));
    }
    return genera;
}