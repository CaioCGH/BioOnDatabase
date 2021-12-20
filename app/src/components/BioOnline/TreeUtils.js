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
    // const newTree = new Tree(root);
    console.log(root);
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
    console.log(this.root);
    return Tree.findParentLevel2(levelName, this.root);
  }
  
  static findNodesOfLevel(levelName, node){
    if(node.levelName == "Subespécie"){
      return [];
    }
    console.log("levelName",levelName);
    console.log("node",node);
    console.log(node.children[0].name, levelName, node.children[0].levelName == levelName);
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
    console.log("finding Node");
    if(node.levelName == "Subespécie"){
      return [];
    }
    // console.log(levelName);
    // console.log(node);
    console.log(node.levelName, levelName, node.levelName == levelName);
    console.log(node.name, name, node.name == name);
    if(node.levelName == levelName && node.name == name){
      console.log("found node", node);
      // throw "stop"
      return [node];
    }
    const yes = [];
    for(let i = 0; i < node.children.length; i++){
      yes.push(...this.findNodesOfLevelAndName(levelName, name, node.children[i]));
    }
    return yes;
  }
};
