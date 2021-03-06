import bioOnlineController from "../controllers/bioOnline.controller.js";
import externalController from "../controllers/external.controller.js";
import speciesController from "../controllers/species.controller.js";
import observationController from "../controllers/observation.controller.js";
import observerController from "../controllers/observer.controller.js";
import localityController from "../controllers/locality.controller.js"; 

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/bio-online-columns", bioOnlineController.bioOnlineColumns);
  app.get("/api/bio-online-filter-dict", bioOnlineController.bioOnlineFilterDict);
  app.get("/api/get-genera-species-commonnames", bioOnlineController.generaSpeciesCommonNames);
  app.get("/api/get-bio-online-localities", bioOnlineController.localities);
  app.get("/api/search-animal", bioOnlineController.searchAnimal);
  app.post("/api/bio-online-search-species-in-localities", bioOnlineController.speciesInLocalities);
  app.post("/api/download-from-localities", bioOnlineController.downloadFromLocalities);
  app.post("/api/wikiaves-search", externalController.wikiavesSearch);
  app.post("/api/wikiaves-search-wid", externalController.wikiavesSearchByWid);
  app.post("/api/ebird-search", externalController.ebirdSearch);
  app.post("/api/inaturalist-search", externalController.inaturalistSearch);

  app.get("/api/taxonomy-tree", speciesController.getTaxonomyTree);



  app.get("/api/all-species", speciesController.getAllSpecies);
  app.get("/api/species-by-scientific-name", speciesController.getSpecies);
  app.post("/api/create-species", speciesController.createSpecies);
  app.post("/api/update-species", speciesController.updateSpecies);
  app.post("/api/delete-species", speciesController.deleteSpecies);


  app.get("/api/observations-by-species-id", observationController.getObservationsBySpeciesId);
  app.post("/api/create-observation", observationController.createObservation);
  app.post("/api/update-observation", observationController.updateObservation);
  app.post("/api/delete-observation", observationController.deleteObservation);

  app.get("/api/find-all-observers", observerController.findAllObservers);


  app.get("/api/all-localities", localityController.getAllLocalities);
  app.get("/api/locality-by-name", localityController.getLocality);
  app.post("/api/create-locality", localityController.createLocality);
  app.post("/api/update-locality", localityController.updateLocality);
  app.post("/api/delete-locality", localityController.deleteLocality);

  app.get("/api/all-observers", observerController.getAllObservers);
  app.get("/api/observer-by-name", observerController.getObserver);
  app.post("/api/create-observer", observerController.createObserver);
  app.post("/api/update-observer", observerController.updateObserver);
  app.post("/api/delete-observer", observerController.deleteObserver);
}