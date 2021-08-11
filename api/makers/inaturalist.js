var request = require('request');

exports.inaturalistSearch = (searchText) =>{

    const taxonName = searchText;
    const placeType = "city"
    const q = "Sao Paulo";
    // const q = "Rio de Janeiro";

    const url = `https://www.inaturalist.org/observations.json?taxon_name=${taxonName}&has[]=photos&place_type=${placeType}&q=${q}`;
    var options = {
        'method': 'GET',
        'url': url
    };
    return new Promise((resolve, reject)=>{
        request(options, function (error, response) {
            if(error){
                reject(error);
            }
            jsonData = JSON.parse(response.body);
            var relevantDataArray = [];
            for(var i = 0; i < jsonData.length; i++){
                let relevantData = {
                    "data": jsonData[i].observed_on,
                    "descrição": jsonData[i].description,
                    "coordenadas": "" + jsonData[i].latitude + ", " + jsonData[i].longitude,
                    "local": jsonData[i].place_guess,
                    "uri": jsonData[i].uri,
                    "foto_media": jsonData[i].photos[0].medium_url,
                    "autoria": jsonData[i].photos[0].attribution

                }
                relevantDataArray.push(relevantData);
            }
            resolve(relevantDataArray);
        });
    })
}