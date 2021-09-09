const querystring = require('querystring');


export async function searchAnimal(data) {
  const url = `/api/search-animal?genus=${data.genus}&species=${data.species}&commonName=${data.commonName}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getBioOnlineLocalities() {
  const response = await fetch(`/api/get-bio-online-localities`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getGeneraSpeciesCommonName() {
  const response = await fetch(`/api/get-genera-species-commonnames`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function bioOnlineSearchAnimalsInLocalities(payload) {
  const url = `/api/bio-online-search-species-in-localities`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( payload ),
  });
  return await response.json();
}

export async function getBioOnlineColumns() {
  const url = `/api/bio-online-columns`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getBioOnlineFilterDict() {
  const url = `/api/bio-online-filter-dict`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function downLoadList(something) {
  const url = `/api/bio-online-columns`;
  console.log(url + something);
  console.log("url + something");
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const downloadSheetBlob = await response.blob();
  const downloadSheetObjectURL = URL.createObjectURL(downloadSheetBlob);
  console.log(downloadSheetObjectURL);

  const link = document.createElement("a");
  link.href = downloadSheetObjectURL;
  link.setAttribute("download", "fileName");
  document.body.appendChild(link);
  link.click();

  return downloadSheetObjectURL;
}
export async function downloadFromLocalities(payload) {
  var url = '/api/download-from-localities';
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( payload),
  });
  const downloadSheetBlob = await response.blob();
  const downloadSheetObjectURL = URL.createObjectURL(downloadSheetBlob);

  const link = document.createElement("a");
  link.href = downloadSheetObjectURL;
  link.setAttribute("download", "relatorio.xls");
  document.body.appendChild(link);
  link.click();
}

//------------------------------------------------------------
export async function getAllSpecies() {
  const url = `/api/all-species`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getSpecies(payload) {
  let queryString = querystring.stringify(payload);
  const url = `/api/species-by-scientific-name?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function createSpecies(model) {
  const url = `/api/create-species`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {model}),
  });
  return await response.json();
}

export async function updateSpecies(id, model) {
  const url = `/api/update-species`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id, model}),
  });
  return await response.json();
}

export async function deleteSpecies(id) {
  const url = `/api/delete-species`;
  console.log(url);
  console.log(id);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {'id': id}),
  });
  return await response.json();
}

export async function getTaxonomyTree() {
  const url = `/api/taxonomy-tree`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

//----------------------------------------------------------

export async function getObservationsOfSpecies(payload) {
  let queryString = querystring.stringify(payload);
  const url = `/api/observations-by-species-id?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getObservationsOfLocality(payload) {
  let queryString = querystring.stringify(payload);
  const url = `/api/observations-by-locality-id?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function createObservation(model) {
  const url = `/api/create-observation`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {model}),
  });
  return await response.json();
}

export async function updateObservation(id, model) {
  const url = `/api/update-observation`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id, model}),
  });
  return await response.json();
}

export async function deleteObservation(model) {
  const url = `/api/delete-observation`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {'model': model}),
  });
  return await response.json();
}

//-------------------OBSERVERS-----------------

export async function findAllObservers() {
  const url = `/api/find-all-observers`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  return await response.json();
}

//--------------------LOCALITIES------------------------

export async function getAllLocalities() {
  const url = `/api/all-localities`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getLocalities(payload) {
  let queryString = querystring.stringify(payload);
  const url = `/api/localities-by-scientific-name?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function createLocality(model) {
  const url = `/api/create-locality`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( model),
  });
  return await response.json();
}

export async function updateLocality(payload) {
  const url = `/api/update-locality`;
  console.log(url);
  console.log(payload);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function deleteLocality(_id) {
  const url = `/api/delete-locality`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {'_id': _id}),
  });
  return await response.json();
}

//--------------------OBSERVERS------------------------

export async function getAllObservers() {
  const url = `/api/all-observers`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function getObserver(payload) {
  let queryString = querystring.stringify(payload);
  const url = `/api/oberserver-by-name?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function createObserver(model) {
  const url = `/api/create-observer`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {model}),
  });
  return await response.json();
}

export async function updateObserver(payload) {
  const url = `/api/update-observer`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function deleteObserver(_id) {
  const url = `/api/delete-observer`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( {'_id': _id}),
  });
  return await response.json();
}