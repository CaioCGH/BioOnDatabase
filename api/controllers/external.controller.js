import scraper from "../makers/scraper.js";
import ebird from "../makers/ebird.js";
import inaturalist from "../makers/inaturalist.js";

const controller = {
  wikiavesSearch: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
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
    ebird.ebirdSearch(searchCriteria.scientificName).then((data) => {
      res.json(data);
    });
  },
  inaturalistSearch: async function (req, res) {
    const searchCriteria = req.body.searchCriteria;
    inaturalist
      .inaturalistSearch(searchCriteria.scientificName)
      .then((data) => {
        res.json(data);
      });
  },
};

export default controller;