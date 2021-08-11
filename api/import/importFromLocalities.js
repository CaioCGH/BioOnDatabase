const fs = require('fs');
const {connect, drop, closeConnection, readCSV, save, sortObject, t} = require('./importUtils');

const { Locality, District } = require('../models/locality.model');

const csvFilePath = 'localities.csv'

connect().then(() => {
  console.log("Successfully connect to MongoDB.");
  startImport().then(() =>{
    console.log('Started importing.');
  });
});

const startImport = async () => {
  let parsedData = await readCSV(csvFilePath);
  // seedDistricts(parsedData);
  seedLocalities(parsedData);
}


function seedLocalities(parsedData){
  drop('localities');
    for(let i = 0; i < parsedData.length; i++){
        const locality = new Locality({
          'tipo': t(parsedData[i]['Tipoz']),
          'sheetId': t(parsedData[i]['ID']),
          'nome planilha': t(parsedData[i]['Nome_Planilha']),
          'nome completo': parsedData[i]['Nome Completo'] ? t(parsedData[i]['Nome Completo']) : t(parsedData[i]['Nome_Planilha']),
          'UTMX': t(parsedData[i]['UTM X']),
          'UTMY': t(parsedData[i]['UTM Y']),
          'endereço': t(parsedData[i]['Endereço']),
          'distrito': t(parsedData[i]['Distrito']),
          'Observações Registradas': []
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
