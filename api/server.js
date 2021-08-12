const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));


const db = require("./models");
const dbConfig = require("./config/db.config")
const Role = db.role;
var connectionString = "";
if(process.env.NODE_ENV === 'development'){
  // connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}`;
  connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;
}else{
  connectionString = `mongodb+srv://${dbConfig.CLOUD_USERNAME}:${dbConfig.CLOUD_PASSWORD}@${dbConfig.CLOUD_CLUSTERADDR}/${dbConfig.CLOUD_DB}?retryWrites=true&w=majority`;
}

console.log("connecting to:");
console.log(connectionString);


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
require('./routes/auth.routes')(app); 
require('./routes/user.routes')(app);

require('./routes/bioOnline.routes')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on the port::${process.env.PORT} or 3000`);
});