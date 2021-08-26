export function createTree(data) {
  const TAXONOMY_LEVELS = [
    "Filo",
    "Subfilo",
    "Classe",
    "Subclasse",
    "Infraclasse",
    "Ordem",
    "Subordem",
    "Família",
    "Subfamília",
    "Tribo/SubTribo",
    "Gênero",
    "Espécie",
    "Subespécie",
  ];

  var root = {
    name: "Animalia",
    levelName: "Reino",
    numberOfLeaves: 0,
    children: [],
  };
  console.log("data",data);
  for (let i = 0; i < data.length; i++) {
    var parent = root;
    for (var j = 0; j < TAXONOMY_LEVELS.length; j++) {
      const taxonomyNode = {
        name: t(data[i]['Taxonomia'][TAXONOMY_LEVELS[j]]),
        levelName: TAXONOMY_LEVELS[j],
        children: [],
      };

      if(taxonomyNode.levelName === 'Subespécie'){
        taxonomyNode.leavesScientificNames = [t(data[i]['Nome Científico'])];
      }

      var previousExistingNode = checkDuplicateAndPush(
        parent.children,
        taxonomyNode
      );
      if (previousExistingNode) {
        parent = previousExistingNode;
      } else {
        parent = taxonomyNode;
      }
    }
  }

  populateNumberOfLeaves(root);
  findScientificNamesOnLeaves(root);
  return root;
}

function populateNumberOfLeaves(node) {
  if (node.levelName == "Subespécie") {
    node.numberOfLeaves = 1;
    return;
  }
  node.children.forEach((c) => populateNumberOfLeaves(c));

  node.numberOfLeaves = node.children
    .map((c) => c.numberOfLeaves)
    .reduce((a, b) => a + b, 0);
}

function findScientificNamesOnLeaves(node){
    if (node.levelName == "Subespécie") {
        return node.leavesScientificNames;
    }

    var scientifcNames = [];
    for(let i = 0; i < node.children.length; i++){
      scientifcNames.push(...findScientificNamesOnLeaves(node.children[i]));
    }
    node.leavesScientificNames = scientifcNames;
    return node.leavesScientificNames;
}

function checkDuplicateAndPush(array, element) {
  let filtered = array.filter((value) => {
    return value.name + value.levelName == element.name + element.levelName;
  });
  if (filtered.length === 0) {
    array.push(element);
    return false;
  } else {
    return filtered[0];
  }
}

function t(string) {
    console.log("t", string);
  return string.trim().replace(/\s+/g, " ");
}
