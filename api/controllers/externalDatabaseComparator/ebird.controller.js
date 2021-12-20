import scraper from "../../makers/scraper.js";
import bioOnlineController from "../bioOnline.controller.js";


const controller = {

  compare: async function (req, res) {
    const cityName = req.body.cityName;
    const externalSpeciesMap = await scraper.scrapeEbirdSpeciesByPolygon(req.body.ignoreSubspecies);

    const externalSpecies = Object.keys(externalSpeciesMap);

    var bioOnlineSpeciesNames = await bioOnlineBirds(req.body.ignoreSubspecies);

    var intersection = externalSpecies.filter(x => bioOnlineSpeciesNames.includes(x));
    var onlyOnExternalDatabase = externalSpecies.filter(x => !bioOnlineSpeciesNames.includes(x));
    var onlyOnBioOnline = bioOnlineSpeciesNames.filter(x => !externalSpecies.includes(x));

    intersection = intersection.map((x) =>  ({'Nome Científico': x, 'Fontes': externalSpeciesMap[x].map((y) => ({'Link': y}))}));
    onlyOnExternalDatabase = onlyOnExternalDatabase.map((x) =>  ({'Nome Científico': x, 'Fontes': externalSpeciesMap[x].map((y) => ({'Link': y}))}));
    onlyOnBioOnline = onlyOnBioOnline.map((x) =>  ({'Nome Científico': x}));

    res.json({intersection, onlyOnExternalDatabase, onlyOnBioOnline, externalSpeciesMap});
  }
  
};


async function bioOnlineBirds(ignoreSubspecies){
    const localities  = ["Município de São Paulo"];
    const filters = [{ selectedKey: 'Taxonomia.Classe', selectedValue: 'Aves' }];
    const bioOnlineSpecies = await bioOnlineController.findSpeciesFromLocalities(localities, filters, "AND");
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