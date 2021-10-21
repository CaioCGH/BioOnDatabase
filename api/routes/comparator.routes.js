import wikiavesController from "../controllers/externalDatabaseComparator/wikiaves.controller.js";
import ebirdController from "../controllers/externalDatabaseComparator/ebird.controller.js";
import inaturalistController from "../controllers/externalDatabaseComparator/inaturalist.controller.js";


export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/wikiaves-compare", wikiavesController.compare);
  app.post("/api/ebird-compare", ebirdController.compare);
  app.post("/api/inaturalist-compare", inaturalistController.compare);

}