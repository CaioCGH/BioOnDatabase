import db from "../models/index.js";
import {Species, TaxonomyNode}  from "../models/species.model.js";
import { Locality }  from "../models/locality.model.js";
import { sortObjectByKeys, sortAndRemoveDuplicates} from "../utils.js";
import { makeSheet } from "../makers/DownloadSheetMaker.js";

const controller = {
    bioOnlineColumns:  async function(req, res){
        const anySpecies = (await Species.findOne().exec()).toJSON();
        const returnedElementsObject = {
            "Básico": { selected: true, innerOptions: ['Nome Científico', 'Nome Comum']},
            "Taxonomia": { selected: false, innerOptions: Object.keys(anySpecies['Taxonomia'])},
            "Biologia": { selected: false, innerOptions: Object.keys(anySpecies['Biologia'])},
            "Estado de Conservação": { selected: false, innerOptions: Object.keys(anySpecies['Estado de Conservação'])},
            "Resumo das Observações": { selected: false, innerOptions: Object.keys(anySpecies['Resumo das Observações'])},
            "Observações Registradas": { selected: false, innerOptions: ['Observações Registradas']},
            "Observações Extras": { selected: false, innerOptions: Object.keys(anySpecies['Observações Extras'])}
          }
            res.json(returnedElementsObject);
    },
    bioOnlineFilterDict:  async function(req, res){
        const INTEREST_KEYS = ["Taxonomia",
            "Biologia",
            "Estado de Conservação"];
        var filterDict = {"Taxonomia": {},
                "Biologia": {},
                "Estado de Conservação": {}};

        const speciesList = await Species.find().exec();

        for(let i = 0; i < speciesList.length; i++){
            var species = speciesList[i].toJSON();
            var outerKeys = Object.keys(species);
            for(let j = 0; j < outerKeys.length; j++){
                var outerKey = outerKeys[j];
                var outerAttribute = species[outerKey];
                if(INTEREST_KEYS.includes(outerKey)){
                    var innerKeys = Object.keys(outerAttribute);
                    for(let k = 0; k < innerKeys.length; k++){
                        var innerKey = innerKeys[k];
                        var innerAttribute = outerAttribute[innerKey];
                        if(!filterDict[outerKey][innerKey]){
                            filterDict[outerKey][innerKey] = {selected: [], domain: []}    
                        }
                        var currentDomainAsSet = new Set(filterDict[outerKey][innerKey].domain);
                        currentDomainAsSet.add(innerAttribute);
                        filterDict[outerKey][innerKey].domain = [...currentDomainAsSet].sort();
                    }    
                }
            }
        }
        res.json(filterDict);
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
        var speciesList = await speciesFromLocalities(req.body.localities, req.body.filters);
        if(speciesList){
            res.json(speciesList);
        }else{
            res.status(404).send("Localidade não encontrada");
        }
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
        var speciesList = await speciesFromLocalities(req.body.localities, req.body.filters);
        makeSheet(res, req.body.selectedArray, speciesList);
    }
}

async function speciesFromLocalities(localities, extraFilters){
    var localitiesNames = [];
    if(Array.isArray(localities)){
        localitiesNames = localities;
    }else{
        localitiesNames.push(localities);
    }
    const speciesMap = {};
    for(let i = 0; i < localitiesNames.length; i++){
        const locality = (await Locality.find({'Nome Completo': localitiesNames[i]}).exec())[0];
        if(!locality){
            return null;
        }
        const observations = locality['Observações Registradas'];
        for(let j = 0; j < observations.length; j++){
            var baseFilter = {'Nome Científico': observations[j]['Nome Científico']};
            for(let k = 0; k < extraFilters.length; k++){
                baseFilter[extraFilters[k].selectedKey] = extraFilters[k].selectedValue;
            }
            const species = await Species.findOne(baseFilter).select('-__v -_id').exec();
            if(species){
                speciesMap[species['Nome Científico']] = species;
            }
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

export default controller;