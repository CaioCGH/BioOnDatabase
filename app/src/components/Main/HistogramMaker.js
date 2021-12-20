export function createHistogram(data) {
    const targetClasses = [
        {name: "Osteichtyes",
        taxonomyLevel: "Classe",
        translation: "Peixes",
        quantity: null},
        {name: "Amphibia",
        taxonomyLevel: "Classe",
        translation: "Anfíbios",
        quantity: null},
        {name: "Reptilia",
        taxonomyLevel: "Classe",
        translation: "Répteis",
        quantity: null},
        {name: "Aves",
        taxonomyLevel: "Classe",
        translation: "Aves",
        quantity: null},
        {name: "Mammalia",
        taxonomyLevel: "Classe",
        translation: "Mamíferos",
        quantity: null},
        {name: "Mollusca",
        taxonomyLevel: "Filo",
        translation: "Moluscos",
        quantity: null},
        {name: "Crustacea",
        taxonomyLevel: "Subfilo",
        translation: "Crustáceos",
        quantity: null},
        {name: "Araneae",
        taxonomyLevel: "Ordem",
        translation: "Aranhas",
        quantity: null},
        {name: "Insecta",
        taxonomyLevel: "Classe",
        translation: "Insetos",
        quantity: null}
    ];
    
    const histogram = {}
    for (let i = 0; i < data.length; i++) {
        for (var j = 0; j < targetClasses.length; j++) {
            if(data[i]['Taxonomia'] [targetClasses[j]['taxonomyLevel']] == targetClasses[j]['name']){
                if(histogram[targetClasses[j]['name']]){
                    histogram[targetClasses[j]['name']]++;
                }else{
                    histogram[targetClasses[j]['name']] = 1;
                }
            }
        }
    }
    return histogram;
}