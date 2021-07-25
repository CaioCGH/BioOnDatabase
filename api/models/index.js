const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.locality = require("./locality.model");
db.district = require("./locality.model");
db.species = require("./species.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;