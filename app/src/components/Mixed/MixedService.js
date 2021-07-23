const BioOnlineService = require('../BioOnline/BioOnlineService');
const WikiavesService = require('../Wikiaves/WikiavesService');
const EbirdService = require('../Ebird/EbirdService');
const InaturalistService = require('../Inaturalist/InaturalistService');

export async function mixedSearch(data) {
    var mixedResults = [];
    const animalRows = await BioOnlineService.searchAnimal(data);
    for(var i = 0; i < animalRows.length; i++){
        const scientificName = animalRows[i]['Nome Científico'];


        const wikiavesResult = await searchSpeciesWikiaves( scientificName);
        const ebirdResult = await searchEbird(scientificName);
        const inaturalistResult = await searchInaturalist(scientificName);
        const mixedResult = {
            animalRow : animalRows[i],
            wikiavesResult,
            ebirdResult,
            inaturalistResult
        }
        console.log(mixedResult);
        mixedResults.push(mixedResult);
    }
    
    console.log(mixedResults);
    return mixedResults;
  }

async function  searchSpeciesWikiaves(scientificName){
    const wikiavesWids =  await WikiavesService.wikiavesSearch({wikiavesSearchTerm: scientificName});
    console.log("wids:", wikiavesWids);
    if( wikiavesWids.length < 1){
        return false;
    }
    const wikiavesResult = await WikiavesService.wikiavesSearchByWid(wikiavesWids[0]);//Quase um "Estou com Sorte" do Google
    return await wikiavesResult;
}
async function  searchEbird(scientificName){
    const ebirdResult =  await EbirdService.ebirdSearch({scientificName: scientificName});
    return await ebirdResult;
}

async function  searchInaturalist(scientificName){
    const inaturalistResult =  await InaturalistService.inaturalistSearch({scientificName: scientificName});
    return await inaturalistResult;
}