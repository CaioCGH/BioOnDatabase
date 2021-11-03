import express from 'express';
import bodyParser from"body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


import db from "./models/index.js";
import dbConfig from "./config/db.config.js";

const Role = db.role;
var connectionString = "";
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'development'){
  connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}`;
  // connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;
}else{
  connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;
}

console.log("connecting to:", connectionString, "in", process.env.NODE_ENV, "mode" );


db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get("/", function (req, res) {
  res.send("<h1>Bem vindo à API do projeto BioOnDatabase FaunaSP!</h1>")
})

// routes
import auth from './routes/auth.routes.js'; 
import comparator from './routes/comparator.routes.js';
import bioOnline from './routes/bioOnline.routes.js';

auth(app);
comparator(app);
bioOnline(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on the port::${process.env.PORT} or 3000`);
});