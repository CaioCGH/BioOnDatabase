const fs = require('fs');
const util = require('util');

const Papa = require('papaparse');

const db = require("../models");
const Species = db.species;

const csvFilePath = 'observadores.csv'

const dbConfig = require("../config/db.config");
const { Title, Affiliation } = require('../models/locality.model');
const connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}}`;

console.log("connecting to:");
console.log(connectionString);

db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial().then(()=>{
        console.log("end?");
    });
})

const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        console.log('Complete', results.data.length, 'records.'); 
        resolve(results.data);
      }
    });
  });
};

const initial = async () => {
  let parsedData = await readCSV(csvFilePath);
  // seedTaxonomyTree(parsedData);
  // seedTiles(parsedData);
  // console.log(parsedData);
  seedAffiliation(parsedData);
}

function seedAffiliation(parsedData){ 
    var affiliations = {};
    for(let i = 0; i < parsedData.length; i++){
        const affiliation = new Affiliation({
            name: t(parsedData[i]['Vínculo']),
        });
        if(affiliations[affiliation.name] == undefined){
          affiliations[affiliation.name] = affiliation;
        }
    }
    const sorted = sortObject(affiliations);
    var entries = Object.entries(sorted);
    for(var i = 0; i < entries.length; i++){
        save(entries[i][1]);
    }
}
function seedTiles(parsedData){ 
    var titles = {};
    for(let i = 0; i < parsedData.length; i++){
        const title = new Title({
            name: t(parsedData[i][' titulação']),
            abbreviation: parsedData[i][' titulação']
        });
        if(titles[title.name] == undefined){
          titles[title.name] = title;
        }
    }
    const sorted = sortObject(titles);
    var entries = Object.entries(sorted);
    for(var i = 0; i < entries.length; i++){
        save(entries[i][1]);
    }
}
function save(obj){
    obj.save({checkKeys: false}, err => {//checkeysfalse para keys com ponto (.)
    if (err) {
        console.log("erro:", err);
        return;
    }
    console.log("Obj cadastrado: " + obj.name);
    });
}
function sortObject(unordered){
  return Object.keys(unordered).sort().reduce(
    (obj, key) => { 
      obj[key] = unordered[key]; 
      return obj;
    }, 
    {}
  );
}

function seedSpecies(parsedData){
    for(let i = 0; i < parsedData.length; i++){
    const species = new Species({
        scientificName:  t(parsedData[i]['Gênero'] + " " + parsedData[i]['Espécie'] + " " + parsedData[i]['Subespécie']),
        commonName: t(parsedData[i]['Gênero']),
        taxonomy: {
            Reino: t(parsedData[i]['Reino']),
            Filo: t(parsedData[i]['Filo']),
            Subfilo: t(parsedData[i]['Subfilo']),
            Classe: t(parsedData[i]['Classe']),
            Subclasse: t(parsedData[i]['Subclasse']),
            Infraclasse: t(parsedData[i]['Infraclasse']),
            Ordem: t(parsedData[i]['Ordem']),
            Subordem: t(parsedData[i]['Subordem']),
            'Família': t(parsedData[i]['Família']),
            'Subfamília': t(parsedData[i]['Subfamília']),
            'Tribo/SubTribo': t(parsedData[i]['Tribo/SubTribo']),
            'Gênero': t(parsedData[i]['Gênero']),
            'Espécie': t(parsedData[i]['Espécie']),
            'Subespécie': t(parsedData[i]['Subespécie']),
            Autor: t(parsedData[i]['Autor']),
            'Nome Comum': t(parsedData[i]['Nome Comum']),
            'Nome em Inglês': t(parsedData[i]['Nome em Inglês']),
            'Observações': t(parsedData[i]['Observações']),
        },
        biology:{
            'Natureza':t(parsedData[i]['Natureza']),
            'Natureza (Revisão Invertebrados)':t(parsedData[i]['Natureza (Revisão Invertebrados)']),
            'Endemismo Mata Atlântica':t(parsedData[i]['Endemismo Mata Atlântica']),
            'Endemismo Brasil':t(parsedData[i]['Endemismo Brasil']),
            'Habitat (Aves: Stotz, ver legenda)':t(parsedData[i]['Habitat (Aves: Stotz, ver legenda)']),
            'Sensibilidade  (Aves: Stotz)':t(parsedData[i]['Sensibilidade  (Aves: Stotz)']),
            'Ocorrência no bioma (AVES - MOREIRA-LIMA, 2013)':t(parsedData[i]['Ocorrência no bioma (AVES - MOREIRA-LIMA, 2013)']),
            'Permanência Federal (CBRO - Aves)':t(parsedData[i]['Permanência Federal (CBRO - Aves)']),
            'Aves Migratórias (SOMENZARI et al\. 2018)':t(parsedData[i]['Aves Migratórias (SOMENZARI et al. 2018)']),
            'Abundância relativa (Anfíbios, Aves)':t(parsedData[i]['Abundância relativa (Anfíbios, Aves)']),
            'Alimentação':t(parsedData[i]['Alimentação']),
            'Guilda Alimentar':t(parsedData[i]['Guilda Alimentar']),
            'Habitat':t(parsedData[i]['Habitat']),
            'Locomoção':t(parsedData[i]['Locomoção']),
        },
        concernStatus: {
            'Decreto Estadual 60.133/2014': t(parsedData[i]['Decreto Estadual 60.133/2014']),
            'Decreto Estadual 63.853/2018': t(parsedData[i]['Decreto Estadual 63.853/2018']),
            'MMA/2014': t(parsedData[i]['MMA/2014']),
            'MMA/2018': t(parsedData[i]['MMA/2018']),
            'IUCN/2014': t(parsedData[i]['IUCN/2014']),
            'IUCN/2019.1e2': t(parsedData[i]['IUCN/2019.1e2']),
            'IUCN/2020': t(parsedData[i]['IUCN/2020']),
            'IUCN/2020 (versão 2020-3) ': t(parsedData[i]['IUCN/2020 (versão 2020-3) ']),
            'IUCN/2021 (versão 2021-1) ': t(parsedData[i]['IUCN/2021 (versão 2021-1) ']),
            'CITES/2014': t(parsedData[i]['CITES/2014']),
            'CITES/2019': t(parsedData[i]['CITES/2019']),
            'CITES/2021 ': t(parsedData[i]['CITES/2021 '])
        }
    });
}

    species.save({checkKeys: false}, err => {
    if (err) {
        console.log("erro:", err);
        return;
    }

    console.log("Species cadastrada: " + species.scientificName);
    });
}
function t(string){
    return string.trim().replace(/\s+/g, " ");
}

function checkDuplicateAndPush(array, element){
  let filtered = array.filter(value => {
    return value.name+value.levelName == element.name + element.levelName;
  });
  if(filtered.length === 0){
    array.push(element);
    return false;
  }else{
    return filtered[0];
  }
}