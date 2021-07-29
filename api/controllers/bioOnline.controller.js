const db = require("../models");
const {Species, TaxonomyNode}  = require("../models/species.model");
const {Locality}  = require("../models/locality.model");
const { sortObjectByKeys, sortAndRemoveDuplicates} = require("../utils");

module.exports = {
    bioOnlineColumns:  async function(req, res){
        const anySpecies = await Species.findOne({'Nome científico':"Anodontites sp."}).exec();
        console.log(Object.keys(anySpecies['Taxonomia']));
        const returnedElementsObject = {
            "Básico": { selected: true, innerOptions: ['Nome Científico', 'Nome Comum']},
            "Taxonomia": { selected: false, innerOptions: Object.keys(anySpecies['Taxonomia'])},
            "Biologia": { selected: false, innerOptions: Object.keys(anySpecies['Biologia'])},
            "Estado de conservação": { selected: false, innerOptions: Object.keys(anySpecies['Estado de conservação'])},
            "Observações registradas": { selected: false, innerOptions: ['Observações registradas']}
          }
            res.json(returnedElementsObject);
    },
    generaSpeciesCommonNames:  async function(req, res){
        const root = await TaxonomyNode.findOne({'name':"Animalia"}).exec();
        const allGenera = findAllGeneraToMap(root);
        const sortedGenera = sortObjectByKeys(allGenera);

        const allSpecies = await Species.find().exec();
        const allCommonNames = allSpecies.map(species => species['Nome comum']);
        const sortedCommonNames = sortAndRemoveDuplicates(allCommonNames);
        res.json({genera: sortedGenera, commonNames: sortedCommonNames});
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