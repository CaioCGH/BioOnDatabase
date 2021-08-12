const db = require("../models");
const {Species, TaxonomyNode}  = require("../models/species.model");
const { Locality }  = require("../models/locality.model");
const { sortObjectByKeys, sortAndRemoveDuplicates} = require("../utils");
const { makeSheet } = require("../makers/DownloadSheetMaker");

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
        const allCommonNames = allSpecies.map(species => species['Nome Comum']);
        const sortedCommonNames = sortAndRemoveDuplicates(allCommonNames);
        res.json({genera: sortedGenera, commonNames: sortedCommonNames});
    },
    localities:  async function(req, res){
        const localities = await Locality.find().exec();
        res.json(localities.map(locality => locality['Nome Completo']).sort());
    },
    speciesInLocalities: async function(req, res){
        console.log(req.query.localities);
        var speciesList = await speciesFromLocalities(req.query.localities);
        res.json(speciesList);
    },
    searchAnimal: async function(req, res){
        const genus = req.query.genus;
        const species = req.query.species;
        const commonName = req.query.commonName;

        var animal;
        animal = await Species.find({"Taxonomia.Gênero" : genus, "Taxonomia.Espécie" : species}).exec();
        if(animal && animal.length > 0 ){
            res.json(addLocalitiesToAnimals(animal)); return;
        }
        animal = await Species.find({"Taxonomia.Gênero" : genus}).exec();
        if(animal && animal.length > 0){
            res.json(addLocalitiesToAnimals(animal)); return;
        }
        animal = await Species.find({"Nome Comum" : commonName}).exec();
        if(animal && animal.length > 0){
            res.json(addLocalitiesToAnimals(animal)); return;
        }
        return [];
    },
    downloadFromLocalities: async function(req, res){
        console.log("req.query", req.body);
        var speciesList = await speciesFromLocalities(req.body.searchCriteria.localities);
        makeSheet(res, req.body.searchCriteria.selectedArray, speciesList);
    }
}

async function speciesFromLocalities(localities){
    console.log(localities);
    var localitiesNames = [];
    if(Array.isArray(localities)){
        localitiesNames = localities;
    }else{
        localitiesNames.push(localities);
    }
    console.log("localitiesNames", localitiesNames);
    const speciesMap = {};
    for(let i = 0; i < localitiesNames.length; i++){
        const locality = (await Locality.find({'Nome Completo': localitiesNames[i]}).exec())[0];
        const observations = locality['Observações Registradas'];
        console.log(observations);
        for(let j = 0; j < observations.length; j++){
            const species = await Species.findOne({'Nome Científico': observations[j]['Nome Científico']}).select('-__v -_id').exec();
            speciesMap[species['Nome Científico']] = species;
        }
    }
    return Object.entries(speciesMap).map(entry => entry[1]);
}

function addLocalitiesToAnimals(animals){
    const localizedAnimals = [];
    for(let i = 0; i < animals.length; i++){
        const animal =  animals[i].toJSON();
        for(let j = 0; j < animal['Observações Registradas'].length; j++){
            const observation = animal['Observações Registradas'][j];
            animal[observation['Localidade']] = observation['Registro Original'];
        }
        localizedAnimals.push(animal);
    }
    return localizedAnimals;
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