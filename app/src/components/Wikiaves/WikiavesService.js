export async function wikiavesSearch(data) {
    console.log("in service", data);
    console.log(JSON.stringify({searchCriteria: data}));
    const response = await fetch(`/api/wikiaves-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

export async function wikiavesSearchByWid(data) {
    console.log(JSON.stringify("searchCriteria: data"));
    console.log(JSON.stringify({searchCriteria: data}));
    const response = await fetch(`/api/wikiaves-search-wid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

