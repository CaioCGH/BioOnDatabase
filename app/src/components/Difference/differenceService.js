export async function getDifferenceFromWikiaves(payload) {
    console.log("in service", payload);
    const response = await fetch(`/api/wikiaves-compare`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify(payload),
      })
    return await response.json();
}

export async function getDifferenceFromEbird(payload) {
    console.log("in service", payload);
    const response = await fetch(`/api/ebird-compare`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify(payload),
      })
    return await response.json();
}

export async function getDifferenceFromInaturalist(payload) {
    console.log("in service", payload);
    const response = await fetch(`/api/inaturalist-compare`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify(payload),
      })
    return await response.json();
}