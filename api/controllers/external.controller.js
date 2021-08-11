const scraper = require("../makers/scraper");
const ebird = require("../makers/ebird");
const inaturalist = require("../makers/inaturalist");

module.exports = {
  wikiavesSearch: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
    console.log(searchCriteria);
    scraper
      .scrapeWikiavesSearch(searchCriteria.wikiavesSearchTerm)
      .then((data) => {
        res.json(data);
      });
  },
  wikiavesSearchByWid: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
    scraper.scrapewikiavesSearchByWid(searchCriteria.wid).then((data) => {
      res.json(data);
    });
  },
  ebirdSearch: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
    console.log(searchCriteria);
    ebird.ebirdSearch(searchCriteria.scientificName).then((data) => {
      res.json(data);
    });
  },
  inaturalistSearch: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
    console.log(searchCriteria);
    inaturalist
      .inaturalistSearch(searchCriteria.scientificName)
      .then((data) => {
        res.json(data);
      });
  },
};
