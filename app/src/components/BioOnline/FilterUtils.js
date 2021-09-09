export function passOnFilter(selectedFilters, animalRow) {
  var flatAnimalRow = flattenObject(animalRow);
  var filterMap = filterArrayToFilterMap(selectedFilters);
  var filterKeys = Object.keys(filterMap);
  for (let i = 0; i < filterKeys.length; i++) {
    if (!filterMap[filterKeys[i]].includes(flatAnimalRow[filterKeys[i]])) {
      return false;
    }
    return true;
  }
}

function filterArrayToFilterMap(selectedFilters) {
  var filterMap = {};
  for (let i = 0; i < selectedFilters.length; i++) {
    if (!filterMap[selectedFilters[i].selectedKey]) {
      filterMap[selectedFilters[i].selectedKey] = [];
    }
    filterMap[selectedFilters[i].selectedKey].push(
      selectedFilters[i].selectedValue
    );
  }
  return filterMap;
}

export function flattenObject(obj) {
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
}

export function flattenSpecies(obj) {
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
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  }
  return flattened;
}
