export function passOnFilter(selectedFilters, animalRow) {
    var flatAnimalRow = flattenObject(animalRow);
    var filterMap = filterArrayToFilterMap(selectedFilters);
    var filterKeys = Object.keys(filterMap);
    for(let i = 0; i < filterKeys.length; i++){
        if(!filterMap[filterKeys[i]].includes(flatAnimalRow[filterKeys[i]])){
            return false;
        }
        return true;
    }
}

function filterArrayToFilterMap(selectedFilters){
    var filterMap = {};
    for(let i = 0; i < selectedFilters.length; i++){
        if(!filterMap[selectedFilters[i].selectedKey]){
            filterMap[selectedFilters[i].selectedKey] = [];
        }
        filterMap[selectedFilters[i].selectedKey].push(selectedFilters[i].selectedValue);
    }
    return filterMap;
}

function flattenObject(obj){
    const flattened = {}

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObject(obj[key]))
      } else {
        flattened[key] = obj[key]
      }
    })
    return flattened;
  }