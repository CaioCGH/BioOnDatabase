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
  let queryString = querystring.stringify(payload);
  const url = `/api/bio-online-search-species-in-localities?${queryString}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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
    body: JSON.stringify({searchCriteria: payload}),
  });
  const downloadSheetBlob = await response.blob();
  const downloadSheetObjectURL = URL.createObjectURL(downloadSheetBlob);

  const link = document.createElement("a");
  link.href = downloadSheetObjectURL;
  link.setAttribute("download", "relatorio.xls");
  document.body.appendChild(link);
  link.click();
}
