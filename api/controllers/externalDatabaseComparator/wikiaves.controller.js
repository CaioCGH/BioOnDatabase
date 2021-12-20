import scraper from "../../makers/scraper.js";
import bioOnlineController from "../bioOnline.controller.js";


const controller = {

  compare: async function (req, res) {
    const cityName = req.body.cityName;
    const wikiavesSpecies = await scraper.scrapeWikiavesSpeciesByCity(cityName);

    const localities  = ["Município de São Paulo"];
    const filters = [{ selectedKey: 'Taxonomia.Classe', selectedValue: 'Aves' }];
    const bioOnlineSpecies = await bioOnlineController.findSpeciesFromLocalities(localities, filters, "AND");
    var bioOnlineSpeciesNames = []

    if(req.body.ignoreSubspecies){
      bioOnlineSpeciesNames = bioOnlineSpecies.map((x) => (
         x['Taxonomia']['Gênero'] + " " + x['Taxonomia']['Espécie']
        ));
    }else{
      bioOnlineSpeciesNames = bioOnlineSpecies.map(x => x['Nome Científico']);
    }

    var intersection = wikiavesSpecies.filter(x => bioOnlineSpeciesNames.includes(x));
    var onlyOnWikiaves = wikiavesSpecies.filter(x => !bioOnlineSpeciesNames.includes(x));
    var onlyOnBioOnline = bioOnlineSpeciesNames.filter(x => !wikiavesSpecies.includes(x));

    intersection = intersection.map((x) =>  ({'Nome Científico': x}));
    onlyOnWikiaves = onlyOnWikiaves.map((x) =>  ({'Nome Científico': x}));
    onlyOnBioOnline = onlyOnBioOnline.map((x) =>  ({'Nome Científico': x}));

    res.json({intersection, onlyOnWikiaves, onlyOnBioOnline});
  }
  
};

export default controller;