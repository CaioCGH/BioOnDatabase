import scraper from "../../makers/scraper.js";


module.exports = {
  compare: async function (req, res) {
    const cityName = req.body.cityName;
    scraper
      .scrapeWikiavesSpeciesByCity(cityName)
      .then((data) => {
        res.json(data);
      });
  },





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
  }
};
