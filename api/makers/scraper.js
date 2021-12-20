import * as cheerio from "cheerio";
import request from "request";
import fetch from "node-fetch";
import ebird from "../makers/ebird.js";
import fs from "fs";
import FormData from "form-data";
import { isAsyncFunction } from "util/types";
import { Console } from "console";
import * as csv from 'fast-csv';
import axios from 'axios';

const scrapewikiavesSearchByWid = (wikiavesCode) => {
  const url = "https://www.wikiaves.com.br/wiki/" + wikiavesCode;
  console.log(url);
  return new Promise((resolve, reject) => {
    request(url, (err, resp, body) => {
      if (err) {
        reject(error);
      }
      let $ = cheerio.load(body);
      let $url = url;
      var $taxonomy = {};
      var table = [];
      $("td").each((index, element) => {
        table.push($(element).text());
      });
      for (var i = 0; i < table.length - 1; i = i + 2) {
        $taxonomy[table[i]] = table[i + 1];
      }

      let $mainImg = $(".wa-capa").attr("src");
      let $ocurrencesMap = $(
        'img[title="Ocorrências registradas no WikiAves"]'
      ).attr("src");

      var result = {
        url: $url,
        taxonomy: $taxonomy,
        mainImg: $mainImg,
        ocurrencesMap: $ocurrencesMap,
      };
      resolve(result);
    });
  });
};

const scrapeWikiavesSearch = (searchText) => {
  const url =
    "https://www.wikiaves.com.br/getTaxonsJSON.php?term=" + searchText;
  console.log(url);
  return new Promise((resolve, reject) => {
    request(url, (err, resp, data) => {
      if (err) {
        reject(error);
      }
      jsonData = JSON.parse(data);
      resolve(jsonData);
    });
  });
};

const scrapeWikiavesSpeciesByCity = async (cityName) => {
  const cityId = await findCityId(cityName);
  const htmlData = await getCityDataInHTML(cityId);

  let $ = cheerio.load(htmlData, { xmlMode: true });
  var speciesList = [];

  $("script:not([src])").each((index, element) => {
    let line = element.children[0].data;
    if (line.trim().startsWith("lsp(")) {
      speciesList.push(line.split(",")[2].match(/'([^']+)'/)[1]);
    }
  });
  return speciesList;
};

const scrapeEbirdSpeciesByState = async (ignoreSubspecies) => {
  const htmlData = await getStateDataInHTML();

  var speciesList = [];
  var code;

  var searchPattern = new RegExp(
    '<a href="/species/(.*?)/BR-SP" data-species-code="',
    "gs"
  );

  while ((code = searchPattern.exec(htmlData)) !== null) {
    var speciesName = ebird.findScientificNameByEbirdCode(code[1]);
    if (ignoreSubspecies && speciesName) {
      let splited = speciesName.split(" ");
      speciesName = splited[0] + " " + splited[1];
    }
    speciesList.push(speciesName);
  }
  return speciesList;
};

const scrapeEbirdSpeciesByPolygon = async (ignoreSubspecies) => {

  var startTime = performance.now()

    const links = await getListOfHotSpotsLinks();
    console.log(links);
    const speciesCodeLinksMap = {};
    for(let i = 0; i < links.length; i++){
      const speciesCodes = await getListOfHotSpotSpeciesLinks(links[i]);
      for(let j = 0; j < speciesCodes.length; j++){
        const code = speciesCodes[j].split('/')[2];
        if(speciesCodeLinksMap[code]){
            speciesCodeLinksMap[code].push("http://ebird.org" + speciesCodes[j]);
        }else{
            speciesCodeLinksMap[code] = ["http://ebird.org" + speciesCodes[j]];
        }
      }
      console.log(
        Math.trunc((i / links.length) * 1000) / 10 + "% completed\r"
      );
    }

    var endTime = performance.now()
    console.log(`Ebird full scrap took ${endTime - startTime} milliseconds`)

    const speciesLinksMap = transformCodeMapToScientificnameMap(speciesCodeLinksMap);
    return speciesLinksMap;
};

function transformCodeMapToScientificnameMap(oldMap){
    const newMap = {};
    const keys = Object.keys(oldMap);
    for(let i = 0; i < keys.length; i++){
        newMap[ebird.findScientificNameByEbirdCode(keys[i])] = oldMap[keys[i]];
    }
    return newMap;
}


async function findCityId(cityName) {
  const citySearchBaseUrl = "https://www.wikiaves.com.br/getCidadesJSON.php?";
  const cityParams = new URLSearchParams({ term: cityName });
  const citySearchFullUrl = citySearchBaseUrl + cityParams.toString();

  const response = await fetch(citySearchFullUrl, { method: "GET" });
  const data = await response.json();

  const cityId = data.find((e) => e.label === cityName).id;
  return cityId;
}

async function getCityDataInHTML(cityId) {
  const citySearchBaseUrl = "https://www.wikiaves.com.br/especies.php?";
  const cityParams = new URLSearchParams({ t: "c", c: cityId });
  const citySearchFullUrl = citySearchBaseUrl + cityParams.toString();

  const response = await fetch(citySearchFullUrl, { method: "GET" });
  const data = await response.text();

  return data;
}

async function getStateDataInHTML() {
  const stateSearchBaseUrl = "https://ebird.org/region/BR-SP?yr=all";
  const response = await nodeFetch();
  const data = await response.text();
  return data;
}

async function getListOfHotSpotSpeciesLinks(link) {
  const cookiesResponse = await obtainHotSpotCookiesWithAxios(link);
  const response = await obtainSpeciesOfHotSpotAxios(link, cookiesResponse.headers['set-cookie'][0]);
  if(!response){
    console.log("não pode obter " + link);
    return;
  }

  const html = await response.data;
  const $ = cheerio.load(html);
  const listItems = $("a");
  
  const birdLinks = [];
  listItems.each(function (idx, el) {
    const birdLink = $(el).attr("href");
    if (birdLink.startsWith("/species/")) {
      birdLinks.push(birdLink);
    }
  });
    return birdLinks;

}
async function getListOfHotSpotsLinks() {
    const response = await nodeHotSpotsFetch();
    const html = await response.text();
  
    const $ = cheerio.load(html);
    const listItems = $("a");
    const links = [];
    listItems.each(function (idx, el) {
      const link = $(el).attr("href");
      if (link.startsWith("https://ebird.org/hotspot/")) {
        links.push(link);
      }
    });
    return links;
}

async function obtainHotSpotCookiesWithAxios(link) {
  const options = {
    url: link,
    method: 'GET',
    withCredentials: true,
    maxRedirects: 0,
    validateStatus: function (status) {
      return status >= 200 && status < 303; // default
  },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  };

  return await axios(options);

}


async function obtainSpeciesOfHotSpotAxios(link, cookies) {
  const options = {
    url: link,
    method: 'GET',
    withCredentials: true,
    maxRedirects: 0,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cookie': cookies
    }
  };
  
  return await axios(options);
}
async function nodeHotSpotsFetch() {
  const form = new FormData();

  const stats = fs.statSync("makers/saopaulo.kml");
  const fileSizeInBytes = stats.size;

  let readStream = fs.createReadStream("makers/saopaulo.kml");
  form.append("polygonFile", readStream, { knownLength: fileSizeInBytes });
  form.append("maxLocations", 1500);

  return await fetch(
    "https://ebird-tools.thruhere.net/cgi-bin/eBirdPolygon.d",
    {
      credentials: "omit",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary0BaLtEeZAlMp4Yvj",
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer: "https://ebird-tools.thruhere.net/polygon.html",
      body: form,
      method: "POST",
      mode: "cors",
    }
  );
}

function nodeFetch() {
  return fetch("https://ebird.org/region/BR-SP?yr=all", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "EBIRD_SESSIONID=72E44A9468ADB682E43E75331D4937D5; _ga=GA1.2.501121683.1636027915; _gid=GA1.2.1138368485.1636027915; _gat_gtag_UA_171937_2=1; __hstc=60209138.b55722931de53bfc2db34fd1a42cda55.1636027914901.1636027914901.1636027914901.1; hubspotutk=b55722931de53bfc2db34fd1a42cda55; __hssrc=1; __hssc=60209138.1.1636027914901; _fbp=fb.1.1636027917070.1248195891",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
}
const scraper = {
  scrapewikiavesSearchByWid,
  scrapeEbirdSpeciesByPolygon,
  scrapeEbirdSpeciesByState,
  scrapeWikiavesSearch,
  scrapeWikiavesSpeciesByCity,
  findCityId,
};
export default scraper;
