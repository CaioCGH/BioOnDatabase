import bioOnlineController from "../bioOnline.controller.js";
import fetch from 'node-fetch';



const controller = {

  compare: async function (req, res) {

    const externalSpecies = await speciesInCity(req.body.ignoreSubspecies);

    var bioOnlineSpeciesNames = await bioOnlineSpecies(req.body.ignoreSubspecies);

    var intersection = externalSpecies.filter(x => bioOnlineSpeciesNames.includes(x));
    var onlyOnExternalDatabase = externalSpecies.filter(x => !bioOnlineSpeciesNames.includes(x));
    var onlyOnBioOnline = bioOnlineSpeciesNames.filter(x => !externalSpecies.includes(x));

    intersection = intersection.map((x) =>  ({'Nome Científico': x}));
    onlyOnExternalDatabase = onlyOnExternalDatabase.map((x) =>  ({'Nome Científico': x}));
    onlyOnBioOnline = onlyOnBioOnline.map((x) =>  ({'Nome Científico': x}));

    res.json({onlyOnExternalDatabase, intersection, onlyOnBioOnline});
  }
  
};
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

async function speciesInCity(ignoreSubspecies){
    const url = new URL("https://api.inaturalist.org/v1/observations");
    const params = {
        acc: true,
        captive: false,
        geo: true,
        identified: true,
        place_id: 13334, //São Paulo
        taxon_id: 1, //Animalia
        lrank: "species",
        quality_grade: "research",
        order: "desc",
        order_by: "created_at",
        per_page: 200,
        page: 1};

        
        var speciesSet = new Set();
        let response;
        let data;

        while(true){
        url.search = new URLSearchParams(params).toString();
        
        response =  await fetch(url);
        data = await response.json();

        if(!data.results){
            break;
        }
        for(let i = 0; i < data.results.length; i++){
            var speciesName = data.results[i].taxon.name
            if(ignoreSubspecies){
                let splitSpeciesName = speciesName.split(' ');
                speciesName = splitSpeciesName[0] + " " + splitSpeciesName[1];
            }
            speciesSet.add(data.results[i].taxon.name);
        }
        params.page++;

        console.log("page:", data.page + "/" + 50);

    }

    var speciesList = [...speciesSet];
    


    return speciesList;
}


async function bioOnlineSpecies(ignoreSubspecies){
    const localities  = ["Município de São Paulo"];
    const bioOnlineSpecies = await bioOnlineController.findSpeciesFromLocalities(localities, []);
    var bioOnlineSpeciesNames;
    if(ignoreSubspecies){
        bioOnlineSpeciesNames = bioOnlineSpecies.map((x) => (
           x['Taxonomia']['Gênero'] + " " + x['Taxonomia']['Espécie']
          ));
      }else{
        bioOnlineSpeciesNames = bioOnlineSpecies.map(x => x['Nome Científico']);
      }
      return bioOnlineSpeciesNames;
}
export default controller;