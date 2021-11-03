import {connect, drop, readCSV, save, sortObject, t} from './importUtils.js';

import { Locality, District } from '../models/locality.model.js';

connect().then(() => {
  console.log("Successfully connect to MongoDB.");
  startImport().then(() =>{
    console.log('Started importing.');
  });
});

const startImport = async () => {
  let parsedData = await readCSV("localities.csv");
  // seedDistricts(parsedData);
  seedLocalities(parsedData);
}


function seedLocalities(parsedData){
  drop('localities');
    for(let i = 0; i < parsedData.length; i++){
        const locality = new Locality(parsedData[i]);
        save(locality);
    }
    var specialLocality1 = new Locality({
      'Nome Banco de Dados': 'Município de São Paulo',
      'Nome Completo': 'Município de São Paulo',
      'Observações Registradas': []
      }
    );
    var specialLocality2 = new Locality({
      'Nome Banco de Dados': 'Inventário da Fauna Silvestre',
      'Nome Completo': 'Inventário da Fauna Silvestre',
      'Observações Registradas': []
      }
    );
    var specialLocality3 = new Locality({
      'Nome Banco de Dados': 'Tudo',
      'Nome Completo': 'Tudo',
      'Observações Registradas': []
      }
    );
    save(specialLocality1);
    save(specialLocality2);
    save(specialLocality3);
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
