const {connect, drop, closeConnection, readCSV, save, sortObject, t} = require('./importUtils');
const Papa = require('papaparse');
const db = require("../models");
const csvFilePath = 'observadores.csv'

const { Title, Affiliation, Observer } = require('../models/locality.model');

connect().then(() => {
  console.log("Successfully connect to MongoDB.");
  startImport().then(() =>{
    console.log('Started importing.');
  });
});
// closeConnection();

const startImport = async () => {
  let parsedData = await readCSV(csvFilePath);
  // seedTaxonomyTree(parsedData);
  // seedTiles(parsedData);
  // console.log(parsedData);
  seedAffiliation(parsedData);
  seedObserver(parsedData);
}

function seedAffiliation(parsedData){ 
  drop('affiliations');
    var affiliations = {};
    for(let i = 0; i < parsedData.length; i++){
      console.log("parsedData[i]['Vínculo']", parsedData[i]['Vínculo']);
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
function seedObserver(parsedData){ 
  drop('observers');
    var observers = {};
    for(let i = 0; i < parsedData.length; i++){
        const observer = new Observer({
          'nome': t(parsedData[i]['Nome']),
          'sigla': t(parsedData[i]['Sigla']),
          'título': t(parsedData[i]['titulação']),
          'vínculo': t(parsedData[i]['Vínculo'])
        });
        if(observers[observer.nome] == undefined){
          observers[observer.nome] = observer;
        }
    }
    const sorted = sortObject(observers);
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