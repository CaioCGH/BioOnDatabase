import controller from "../controllers/auth.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.post("/api/auth/signin", controller.signin);



    
  app.post(
    "/api/auth/signup",
    controller.signup
  );

};
