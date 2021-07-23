

export async function inaturalistSearch(data) {
    console.log("inaturalistService", data);
    const response = await fetch(`/api/inaturalist-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}

