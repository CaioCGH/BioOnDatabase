module.exports = class Tree {

  construct(root){
    this.root = root;
  }
  static createTree(data) {
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
    for (let i = 0; i < data.length; i++) {
      var parent = root;
      for (var j = 0; j < TAXONOMY_LEVELS.length; j++) {
        const taxonomyNode = {
          name: Tree.t(data[i]["Taxonomia"][TAXONOMY_LEVELS[j]]),
          levelName: TAXONOMY_LEVELS[j],
          children: [],
        };

        if (taxonomyNode.levelName === "Subespécie") {
          taxonomyNode.leavesNames = [
            {
              scientificName: Tree.t(data[i]["Nome Científico"]),
              commonName: Tree.t(data[i]["Nome Comum"]),
            },
          ];
        }

        var previousExistingNode = Tree.checkDuplicateAndPush(
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

    Tree.populateNumberOfLeaves(root);
    Tree.findScientificNamesOnLeaves(root);
    return root;
  }

  static populateNumberOfLeaves(node) {
    if (node.levelName == "Subespécie") {
      node.numberOfLeaves = 1;
      return;
    }
    node.children.forEach((c) => this.populateNumberOfLeaves(c));

    node.numberOfLeaves = node.children
      .map((c) => c.numberOfLeaves)
      .reduce((a, b) => a + b, 0);
  }

  static findScientificNamesOnLeaves(node) {
    if (node.levelName == "Subespécie") {
      return node.leavesNames;
    }

    var names = [];
    for (let i = 0; i < node.children.length; i++) {
      names.push(...this.findScientificNamesOnLeaves(node.children[i]));
    }
    node.leavesNames = names;
    return node.leavesNames;
  }

  static checkDuplicateAndPush(array, element) {
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

  static t(string) {
    return string.trim().replace(/\s+/g, " ");
  }

  // findAllOptionsInLevel(levelName) {
  // }

  findParentLevel(levelName){
    return Tree.findParentLevel2(levelName, this.root);
  }
  
  static findNodesOfLevel(levelName, node){
    if(node.levelName == "Subespécie"){
      return [];
    }
    if(node.children[0].levelName == levelName){
      return node.children;
    }
    const yes = []
    for(let i = 0; i < node.children.length; i++){
      yes.push(...this.findNodesOfLevel(levelName, node.children[i]));
    }

    return yes;
  }

  static findNodesOfLevelAndName(levelName, name, node){
    if(node.levelName == "Subespécie"){
      return [];
    }
    if(node.levelName == levelName && node.name == name){
      return [node];
    }
    const yes = [];
    for(let i = 0; i < node.children.length; i++){
      yes.push(...this.findNodesOfLevelAndName(levelName, name, node.children[i]));
    }
    return yes;
  }

  static findNode(name, currentNode) {
    var i,
        currentChild,
        result;

    if (name == currentNode.name) {
        return currentNode;
    } else {

        // Use a for loop instead of forEach to avoid nested functions
        // Otherwise "return" will not work properly
        for (i = 0; i < currentNode.children.length; i += 1) {
            currentChild = currentNode.children[i];

            // Search in the current child
            result = this.findNode(name, currentChild);

            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }

        // The node has not been found and we have no more options
        return false;
    }
}
};
