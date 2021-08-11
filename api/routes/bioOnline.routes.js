const { authJwt } = require("../middlewares");
const bioOnlineController = require("../controllers/bioOnline.controller");
const externalController = require("../controllers/external.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/bio-online-columns", bioOnlineController.bioOnlineColumns);
  app.get("/api/get-genera-species-commonnames", bioOnlineController.generaSpeciesCommonNames);
  app.get("/api/get-bio-online-localities", bioOnlineController.localities);
  app.get("/api/bio-online-search-species-in-localities", bioOnlineController.speciesInLocalities);
  app.get("/api/search-animal", bioOnlineController.searchAnimal);
  app.post("/api/download-from-localities", bioOnlineController.downloadFromLocalities);
  app.post("/api/wikiaves-search", externalController.wikiavesSearch);
  app.post("/api/wikiaves-search-wid", externalController.wikiavesSearchByWid);
  app.post("/api/ebird-search", externalController.ebirdSearch);
  app.post("/api/inaturalist-search", externalController.inaturalistSearch);
};