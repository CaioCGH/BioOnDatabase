import scraper from "../../makers/scraper.js";
import bioOnlineController from "../bioOnline.controller.js";


const controller = {

  compare: async function (req, res) {
    const stateName = req.body.cityName;
    const externalSpecies = await scraper.scrapeEbirdSpeciesByState(req.body.ignoreSubspecies);

    var bioOnlineSpeciesNames = await bioOnlineBirds(req.body.ignoreSubspecies);


    var intersection = externalSpecies.filter(x => bioOnlineSpeciesNames.includes(x));
    var onlyOnExternalDatabase = externalSpecies.filter(x => !bioOnlineSpeciesNames.includes(x));
    var onlyOnBioOnline = bioOnlineSpeciesNames.filter(x => !externalSpecies.includes(x));

    intersection = intersection.map((x) =>  ({'Nome Científico': x}));
    onlyOnExternalDatabase = onlyOnExternalDatabase.map((x) =>  ({'Nome Científico': x}));
    onlyOnBioOnline = onlyOnBioOnline.map((x) =>  ({'Nome Científico': x}));

    res.json({intersection, onlyOnExternalDatabase, onlyOnBioOnline});
  }
  
};


async function bioOnlineBirds(ignoreSubspecies){
    const localities  = ["Município de São Paulo"];
    const filters = [{ selectedKey: 'Taxonomia.Classe', selectedValue: 'Aves' }];
    const bioOnlineSpecies = await bioOnlineController.findSpeciesFromLocalities(localities, filters);
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