export async function ebirdSearch(data) {
    console.log("ebirdService", data)
    const response = await fetch(`/api/ebird-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({searchCriteria: data}),
      })
    return await response.json();
}