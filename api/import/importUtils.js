const fs = require("fs");
const db = require("../models");
const Papa = require("papaparse");
const dbConfig = require("../config/db.config");

module.exports.generateId = () => {
  return db.mongoose.Types.ObjectId();
}

module.exports.connect = () => {
  const connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;

  // const connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}}`;
  console.log("connecting to:");
  console.log(connectionString);

  return db.mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.drop = (collectionName) => {
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

module.exports.closeConnection = () => {
  db.mongoose.connection.close();
};

module.exports.readCSV = async (filePath) => {
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

module.exports.save = (obj) => {
  return obj.save({ checkKeys: false }, (err) => {
    //checkeysfalse para keys com ponto (.)
    if (err) {
      console.log("erro:", err);
    }
  });
};
module.exports.sortObject = (unordered) => {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};

module.exports.t = (string) => {
  return string.trim().replace(/\s+/g, " ");
};

module.exports.checkDuplicateAndPush = (array, element) => {
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
