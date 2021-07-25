const fs = require('fs');
const util = require('util');

const Papa = require('papaparse');

const db = require("../models");
const { District } = require('../models/locality.model');
const { Locality } = require('../models/locality.model');

const csvFilePath = 'localities.csv'
const dbConfig = require("../config/db.config");
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
  // seedDistricts(parsedData);
  seedLocalities(parsedData);
}


function seedLocalities(parsedData){
    for(let i = 0; i < parsedData.length; i++){
        const locality = new Locality({
          type: parsedData[i]['Tipoz'],
          sheetId: parsedData[i]['ID'],
          sheetName: parsedData[i]['Nome_Planilha'],
          completeName: parsedData[i]['Nome Completo'],
          UTMX: parsedData[i]['UTM X'],
          UTMY: parsedData[i]['UTM Y'],
          Address: parsedData[i]['Endereço'],
            district: {
            name: parsedData[i]['Distrito'],
            acronym: parsedData[i]['Distrito (Sigla)']
            }
        });
        save(locality);
    }
}
function seedDistricts(parsedData){
    var districts = {};
    for(let i = 0; i < parsedData.length; i++){
        const district = new District({
            name: parsedData[i]['Distrito'],
            acronym: parsedData[i]['Distrito (Sigla)']
        });
        if(districts[district.name] == undefined){
            districts[district.name] = district;
        }
    }
    const sortedDistricts = sortObject(districts);
    var entries = Object.entries(sortedDistricts);
    for(var i = 0; i < entries.length; i++){
        save(entries[i][1]);
    }
}
function save(obj){
    obj.save({checkKeys: false}, err => {
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