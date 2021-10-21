import request from "request";
import * as path from 'path';
import fs from "fs";
import * as csv from 'fast-csv';
import { fileURLToPath } from "url";
import { dirname } from "path";
var ebirdTaxonomy = [];
var scienticNameByCode = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


fs.createReadStream(path.resolve(__dirname, './../resources/ebirdtaxonomy.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => ebirdTaxonomy.push(row))
    .on('end', (rowCount) => (
        createMap()
    ));
    function createMap(){
        for (var i = 0; i < ebirdTaxonomy.length; i++) {
            scienticNameByCode[ebirdTaxonomy[i]["SPECIES_CODE"]] =
              ebirdTaxonomy[i]["SCI_NAME"];
        }
    }

const ebird = {
    ebirdSearch: (searchText) => {
        const speciesCode = findEbirdCodeByScientificName(searchText);
        console.log("searchText", searchText);
        const regionCode = "BR-SP";
    const ebirdapitoken = process.env.EBIRD_TOKEN;

    console.log("ebirdapitoken", ebirdapitoken);
    const url = `https://api.ebird.org/v2/data/obs/${regionCode}/recent/${speciesCode}?sppLocale=pt-br`;

    console.log(url);

    var options = {
      method: "GET",
      url: url,
      headers: {
        "X-eBirdApiToken": `${ebirdapitoken}`,
      },
    };
    return new Promise((resolve, reject) => {
      request(options, function (error, response) {
        if (error) {
          reject(error);
        }
        jsonData = JSON.parse(response.body);
        resolve(jsonData);
      });
    });
  },

  findEbirdCodeByScientificName: function (scientificName) {
    for (var i = 0; i < ebirdTaxonomy.length; i++) {
      // console.log(ebirdTaxonomy[i]);
      //TODO: busca nlogn
      if (
        ebirdTaxonomy[i]["SCIENTIFIC_NAME"].trim() === scientificName.trim()
      ) {
        return ebirdTaxonomy[i].SPECIES_CODE;
      }
    }
    return null;
  },

  findScientificNameByEbirdCode: function (code) {
    return scienticNameByCode[code];
  },
};

export default ebird;