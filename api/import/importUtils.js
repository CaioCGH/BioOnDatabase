import fs from "fs";
import db from "../models/index.js";
import Papa from "papaparse";
import dbConfig from "../config/db.config.js";

export const generateId = () => {
  return db.mongoose.Types.ObjectId();
}

export const connect = () => {
  var connectionString;
  if(process.env.NODE_ENV == 'development'){
    connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}}`;
  }else{
    connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}}`;
  }
  // const connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;

  console.log("connecting to:");
  console.log(connectionString);

  return db.mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const drop = (collectionName) => {
  db.mongoose.connection.db.dropCollection(
    collectionName,
    function (err, result) {
      if (err) {
        if (err.code === 26) {
          console.log("namespace %s not found", collectionName);
        } else {
          console.log("erro ao dropar collection:", err);
        }
      } else {
        console.log("drop result:", result);
      }
    }
  );
};

export const closeConnection = () => {
  db.mongoose.connection.close();
};

export const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        console.log("Complete", results.data.length, "records.");
        resolve(results.data);
      },
    });
  });
};

export const save = (obj) => {
  return obj.save({ checkKeys: false }, (err) => {
    //checkeysfalse para keys com ponto (.)
    if (err) {
      console.log("erro:", err);
    }
  });
};
export const sortObject = (unordered) => {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};

export const t = (string) => {
  return string.trim().replace(/\s+/g, " ");
};

export const checkDuplicateAndPush = (array, element) => {
  let filtered = array.filter((value) => {
    return value.name + value.levelName == element.name + element.levelName;
  });
  if (filtered.length === 0) {
    array.push(element);
    return false;
  } else {
    return filtered[0];
  }
};
