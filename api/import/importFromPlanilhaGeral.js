const LOCALITIES_COLUMN_START = 44;
const {generateId, connect, drop, closeConnection, readCSV, save, sortObject, t, checkDuplicateAndPush} = require('./importUtils');
const fs = require('fs');
const util = require('util');


const { Species, TaxonomyNode } = require('../models/species.model');
const { Locality, Observation, Title, Affiliation, Observer } = require('../models/locality.model');
const { children } = require('cheerio/lib/api/traversing');
const csvFilePath = 'planilha_geral.csv'

connect().then(() => {
  console.log("Successfully connect to MongoDB.");
  startImport().then(() =>{
    console.log('Started importing.');
  });
});

const startImport = async () => {
  let parsedData = await readCSV(csvFilePath);
  seedTaxonomyTree(parsedData);
  // seedSpecies(parsedData);
}

function seedTaxonomyTree(parsedData){
  drop('taxonomynodes');
  const TAXONOMY_LEVELS = ['Filo', 'Subfilo', 'Classe', 'Subclasse', 'Infraclasse', 'Ordem', 'Subordem', 'Família', 'Subfamília', 'Tribo/SubTribo', 'Gênero', 'Espécie', 'Subespécie'];

    var root = {
    name: 'Animalia',
    levelName: 'Reino',
    numberOfLeaves: 0,
    children: [],
  }

  for(let i = 0; i < parsedData.length; i++){
    var parent = root;
    for(var j = 0; j < TAXONOMY_LEVELS.length; j++){
       const taxonomyNode = {
        name: t(parsedData[i][TAXONOMY_LEVELS[j]]),
        levelName: TAXONOMY_LEVELS[j],
        children: [],
      }
      var previousExistingNode = checkDuplicateAndPush(parent.children, taxonomyNode);
      if(previousExistingNode){
        parent = previousExistingNode;
      }else{
        parent = taxonomyNode;
      }
      
    }
  }

  populateNumberOfLeaves(root);

  const rootAsTaxonomyNode = new TaxonomyNode({
    name: 'Animalia',
    levelName: 'Reino',
    numberOfLeaves: root.numberOfLeaves,
    children: root.children,
  })
  rootAsTaxonomyNode.save({checkKeys: false}, err => {
    if (err) {
        console.log("erro:", err);
        return;
    }

    console.log("TaxonomyTable cadastrada!: ");
    });
}

function populateNumberOfLeaves(node){
  if(node.levelName == 'Espécie'){
    node.numberOfLeaves = node.children.length;
    return;
  }
  node.children.forEach(c => populateNumberOfLeaves(c));

  node.numberOfLeaves =
  node.children.map( c => c.numberOfLeaves).reduce((a, b) => a + b, 0)
}

async function  seedSpecies(parsedData){
  drop('species');
  const COL_END_TAXONOMY = 'Observações';
  const COL_START_BIOLOGY = 'Natureza';
  const COL_END_BIOLOGY = 'Locomoção';
  const COL_START_CONCERN = 'Estado de SP (2014)';
  const COL_END_CONCERN = 'CITES (2021) ';
  const COL_START_OBSERVATION_SUMMARY = 'Inventário da Fauna Silvestre';
  const COL_END_OBSERVATION_SUMMARY = 'Município de São Paulo';
  const COL_START_OBSERVATIONS = 'Aclimação';
  const COL_END_OBSERVATIONS = 'Sítio Rio Piavu (Camburi, Municipio de São Sebastião)';
  const COL_START_OBSERVATIONS_EXTRA = 'Distrito/Bairro';
  const COL_END_OBSERVATIONS_EXTRA = 'Lista Município SP';
  
  
  for(let i = 0; i < parsedData.length; i++){
    var speciesRow =  parsedData[i];
    var keys = Object.keys(speciesRow);
    var key = t(keys[0]);
    var keyIndex = 0;
    var taxonomy = {};
    while(key !== COL_START_BIOLOGY){
      taxonomy[t(key)] = t(speciesRow[key]);
      key = keys[++keyIndex];
    }
    var biology = {};
    while(key !== COL_START_CONCERN){
      biology[t(key)] = t(speciesRow[key]);
      key = keys[++keyIndex];
    }
    var concern = {};
    while(key !== COL_START_OBSERVATION_SUMMARY){
      concern[t(key)] = t(speciesRow[key]);
      key = keys[++keyIndex];
    }
    var observationSummary = {};
    while(key !== COL_START_OBSERVATIONS){
      observationSummary[t(key)] = t(speciesRow[key]);
      key = keys[++keyIndex];
    }
    var observations = [];
    while(key !== COL_START_OBSERVATIONS_EXTRA){
      if(speciesRow[key] != ''){
        const localityHeader = key;
        const locality = await findLocality(key);
        const observation = new Observation({
          '_id': generateId(),
          'Nome Científico':  t(t(speciesRow['Gênero']) + " " + t(speciesRow['Espécie']) + " " + t(speciesRow['Subespécie'])),
          'Nome Comum': t(speciesRow['Nome Comum']),
          'Localidade': locality ? locality['Nome Completo'] : t(key),
          'Nome Banco de Dados': t(key),
          'Registro Original': speciesRow[key]
        });
        const observationDetails = await observationMaker(speciesRow[key]);
        if(observationDetails){
          observation['Data'] = observationDetails.date;
          observation['Observadores'] = observationDetails.observers;
        }
        observations.push(observation);
        if(locality){
          locality['Observações Registradas'].push(observation);
          save(locality);
        }
      }
      key = keys[++keyIndex];
    }
    
    var extraObservations = {};
    while(keyIndex < keys.length){
      extraObservations[t(key)] = t(speciesRow[key]);
      key = keys[++keyIndex];
    }


    const species = new Species({
      'Nome Científico':  t(t(speciesRow['Gênero']) + " " + t(speciesRow['Espécie']) + " " + t(speciesRow['Subespécie'])),
      'Nome Comum': t(speciesRow['Nome Comum']),
      'Taxonomia': taxonomy,
      'Biologia': biology,
      'Estado de Conservação': concern,
      'Observações Registradas': observations,
      'Resumo das Observações': observationSummary,
      'Observações Extras': extraObservations,
    });
    save(species);
    process.stdout.write(Math.trunc(i/parsedData.length*1000)/10 + "% completed\r");
  }
}

async function findLocality(headerName){
  let locality;
  locality = await Locality.findOne( {'Nome Banco de Dados': headerName }).exec();
  if(locality){
    return locality;
  }
  locality = await Locality.findOne( {'Nome Banco de Dados': t(headerName) }).exec();
  if(locality){
    return locality;
  }
}

async function observationMaker(string){
  const trimmed = t(string);
  const arr = trimmed.split(' ');
  if(arr.length == 2){
    if(!isNaN(arr[0][0])){
      const trimmedObserversAcronyms = arr[1].replace(/[()]/g, '');
      const  arrOfObserversAcronyms = trimmedObserversAcronyms.split('/');
      const observers = [];
      for(let i = 0; i < arrOfObserversAcronyms.length; i++){
        const observer = await Observer.findOne({ sigla: arrOfObserversAcronyms[i] });
        if(observer){
          observers.push(observer['título'] + " " + observer['nome']);
        }else{
          observers.push(arrOfObserversAcronyms[i]);
        }
      }
      return {
        date: arr[0],
        observers: observers
      }
    }
  }
}