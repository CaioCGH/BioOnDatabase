var request = require('request');
const fs = require("fs");
const parse = require('csv-parse/lib/sync');
var ebirdTaxonomy = [];
fs.readFile(__dirname + "/../resources/ebirdtaxonomy.csv", (error, data) => {
    if(error) {
        throw error;
    }
    ebirdTaxonomy = parse(data, {
        columns: true,
        skip_empty_lines: true
    });
});



exports.ebirdSearch = (searchText) =>{

    const speciesCode = findEbirdCodeByScientificName(searchText);
    console.log("searchText", searchText);
    const regionCode = "BR-SP"
    const ebirdapitoken = process.env.EBIRD_TOKEN;

    console.log('ebirdapitoken', ebirdapitoken);
    const url = `https://api.ebird.org/v2/data/obs/${regionCode}/recent/${speciesCode}?sppLocale=pt-br`;

    console.log(url);
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': url,
        'headers': {
          'X-eBirdApiToken': `${ebirdapitoken}`
        }
    };
    return new Promise((resolve, reject)=>{
        request(options, function (error, response) {
            if(error){
                reject(error);
            }
            jsonData = JSON.parse(response.body);
            resolve(jsonData);
        });
    })
}

var findEbirdCodeByScientificName = function (scientificName) {
    for(var i = 0; i < ebirdTaxonomy.length; i++){
        // console.log(ebirdTaxonomy[i]);
        //TODO: busca nlogn
        if(ebirdTaxonomy[i]["SCIENTIFIC_NAME"].trim() === scientificName.trim()){
            return ebirdTaxonomy[i].SPECIES_CODE;
        }
    }
    return null;
}