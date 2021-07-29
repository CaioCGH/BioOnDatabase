const LOCALITIES_COLUMN_START = 44;
const {connect, drop, closeConnection, readCSV, save, sortObject, t} = require('./importUtils');
const fs = require('fs');
const util = require('util');


const { Species, TaxonomyNode } = require('../models/species.model');
const { Locality, Observation, Title, Affiliation, Observer } = require('../models/locality.model');
const csvFilePath = 'planilha_geral.csv'

connect().then(() => {
  console.log("Successfully connect to MongoDB.");
  startImport().then(() =>{
    console.log('Started importing.');
  });
});

const startImport = async () => {
  let parsedData = await readCSV(csvFilePath);
  // seedTaxonomyTree(parsedData);
  seedSpecies(parsedData);
}

function seedTaxonomyTree(parsedData){
  const TAXONOMY_LEVELS = ['Filo', 'Subfilo', 'Classe', 'Subclasse', 'Infraclasse', 'Ordem', 'Subordem', 'Família', 'Subfamília', 'Tribo/SubTribo', 'Gênero', 'Espécie', 'Subespécie'];

    var root = {
    name: 'Animalia',
    levelName: 'Reino',
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
  console.log(util.inspect(root, false, null, true /* enable colors */));

  const rootAsTaxonomyNode = new TaxonomyNode({
    name: 'Animalia',
    levelName: 'Reino',
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

async function  seedSpecies(parsedData){
  drop('species');
  for(let i = 0; i < parsedData.length; i++){
    const species = new Species({
      'Nome Científico':  t(parsedData[i]['Gênero'] + " " + parsedData[i]['Espécie'] + " " + parsedData[i]['Subespécie']),
      'Nome Comum': t(parsedData[i]['Nome Comum']),
      'Taxonomia': {
          'Reino': t(parsedData[i]['Reino']),
          'Filo': t(parsedData[i]['Filo']),
          'Subfilo': t(parsedData[i]['Subfilo']),
          'Classe': t(parsedData[i]['Classe']),
          'Subclasse': t(parsedData[i]['Subclasse']),
          'Infraclasse': t(parsedData[i]['Infraclasse']),
          'Ordem': t(parsedData[i]['Ordem']),
          'Subordem': t(parsedData[i]['Subordem']),
          'Família': t(parsedData[i]['Família']),
          'Subfamília': t(parsedData[i]['Subfamília']),
          'Tribo/SubTribo': t(parsedData[i]['Tribo/SubTribo']),
          'Gênero': t(parsedData[i]['Gênero']),
          'Espécie': t(parsedData[i]['Espécie']),
          'Subespécie': t(parsedData[i]['Subespécie']),
          'Autor': t(parsedData[i]['Autor']),
          'Nome Comum': t(parsedData[i]['Nome Comum']),
          'Nome em Inglês': t(parsedData[i]['Nome em Inglês']),
          'Observações': t(parsedData[i]['Observações']),
      },
      'Biologia':{
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
      'Estado de Conservação': {
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
        },
        'Observações registradas': []
    });

    var entries = Object.entries(parsedData[i]);
    for(let j = LOCALITIES_COLUMN_START; j < entries.length; j++){
      if(entries[j][1] != ''){
        const localityHeader = t(entries[j][0]);
        const locality = await findLocality(localityHeader);
        const observation = new Observation({
          'Nome Científico': species['Nome Científico'],
          'Nome Comum': species['Nome Comum'],
          'Localidade': locality ? locality['nome completo'] : localityHeader,
          'Registro Original': entries[j][1]
        });
        const observationDetails = await observationMaker(entries[j][1]);
        if(observationDetails){
          observation['Data'] = observationDetails.date;
          observation['Observadores'] = observationDetails.observers;
        }
        species['Observações Registradas'].push(observation);
        if(locality){
          locality['Observações Registradas'].push(observation);
          save(locality);
        }
      }
    }
    save(species);
    process.stdout.write(Math.trunc(i/parsedData.length*1000)/10 + "% completed\r");
  }
}

async function findLocality(headerName){
  let locality;
  locality = await Locality.findOne( {'nome planilha': headerName }).exec();
  if(locality){
    return locality;
  }
  locality = await Locality.findOne( {'nome planilha': t(headerName.replace(/ *\([^)]*\) */g, "")) }).exec();
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