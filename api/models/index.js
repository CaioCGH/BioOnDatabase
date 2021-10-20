import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.mongoose.set('useFindAndModify', false);

import User from "./user.model.js";
import Role from "./role.model.js";
import {Locality, District} from "./locality.model.js";
import {Species } from "./species.model.js";

db.user = User;
db.role = Role;
db.locality = Locality;
db.district = District;
db.species = Species;

db.ROLES = ["user", "admin", "moderator"];

export default db;
