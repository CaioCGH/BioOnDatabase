
const fs = require('fs');
const db = require("../models");
const Papa = require('papaparse');
const dbConfig = require("../config/db.config");

module.exports.connect = () =>{

    const connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}}`;
    console.log("connecting to:");
    console.log(connectionString);

    return db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports.drop = (collectionName) => {
  db.mongoose.connection.db.dropCollection(collectionName, function(err, result) {
    if(err){
      console.log("erro ao dropar collection:", err);
    }
    console.log("drop result:", result);
  });
}

module.exports.closeConnection = () =>{
    db.mongoose.connection.close();
}

module.exports.readCSV = async (filePath) => {
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

module.exports.save = (obj) =>{
    obj.save({checkKeys: false}, err => {//checkeysfalse para keys com ponto (.)
    if (err) {
        console.log("erro:", err);
        return;
    }
    // console.log("Obj cadastrado: " + obj);
    });
}
module.exports.sortObject = (unordered) =>{
  return Object.keys(unordered).sort().reduce(
    (obj, key) => { 
      obj[key] = unordered[key]; 
      return obj;
    }, 
    {}
  );
}

module.exports.t = (string) =>{
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