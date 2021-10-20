import wikiavesController from "../controllers/externalDatabaseComparator/wikiaves.controller.js";


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/wikiaves-search", wikiavesController.compare);

}