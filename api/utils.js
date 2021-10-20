export const sortObjectByKeys = (unordered) => {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};

export const sortAndRemoveDuplicates = (unorderedAndDuplicated) => {
    const sorted = unorderedAndDuplicated.sort();
    return sorted.filter((item, pos, array) => !pos || item != array[pos - 1]);
  };