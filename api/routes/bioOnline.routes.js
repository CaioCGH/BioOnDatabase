const { authJwt } = require("../middlewares");
const controller = require("../controllers/bioOnline.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  console.log(controller.bioOnlineColumns);

  app.get("/api/bio-online-columns", controller.bioOnlineColumns);
  app.get("/api/get-genera-species-commonnames", controller.generaSpeciesCommonNames);
  app.get("/api/get-bio-online-localities", controller.localities);

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};