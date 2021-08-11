exports.flattenObject = (obj) => {
  const flattened = {};
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, this.flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  }
  return flattened;
};

exports.flattenSpecies = (obj) => {
  const flattened = {};
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i];

    if (Array.isArray(obj[key])) {
      for (var j = 0; j < obj[key].length; j++) {
        let observation = obj[key][j];
        flattened[observation["Localidade"]] = observation["Registro Original"];
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, this.flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  }
  return flattened;
};
