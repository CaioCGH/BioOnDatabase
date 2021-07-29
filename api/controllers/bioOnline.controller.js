const db = require("../models");
const {Species, TaxonomyNode}  = require("../models/species.model");
const {Locality}  = require("../models/locality.model");
const { sortObjectByKeys, sortAndRemoveDuplicates} = require("../utils");

module.exports = {
    bioOnlineColumns:  async function(req, res){
        const anySpecies = (await Species.findOne({'Nome Científico':"Anodontites sp."}).exec()).toJSON();
        console.log(Object.keys(anySpecies));
        console.log(Object.keys(anySpecies['Taxonomia']));
        const returnedElementsObject = {
            "Básico": { selected: true, innerOptions: ['Nome Científico', 'Nome Comum']},
            "Taxonomia": { selected: false, innerOptions: Object.keys(anySpecies['Taxonomia'])},
            "Biologia": { selected: false, innerOptions: Object.keys(anySpecies['Biologia'])},
            "Estado de Conservação": { selected: false, innerOptions: Object.keys(anySpecies['Estado de Conservação'])},
            "Observações Registradas": { selected: false, innerOptions: ['Observações Registradas']}
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
        res.json(localities.map(locality => locality['nome completo']).sort());
    },
    speciesInLocalities: async function(req, res){
        var localitiesNames = [];
        if(Array.isArray(req.query.localities)){
            localitiesNames = req.query.localities;
        }else{
            localitiesNames.push(req.query.localities);
        }
        const speciesList = [];
        for(let i = 0; i < localitiesNames.length; i++){
            const locality = (await Locality.find({'nome completo': localitiesNames[i]}).exec())[0];
            const observations = locality['Observações Registradas'];
            for(let j = 0; j < observations.length; j++){
                const species = await Species.findOne({'Nome Científico': observations[j]['Nome Científico']}).select('-__v -_id').exec();
                speciesList.push(species);
            }
        }
        res.json(sortAndRemoveDuplicates(speciesList));
    }
}

function findAllGeneraToMap(node){
    if(node.levelName == 'Gênero'){
        let dict  = {}
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