import cheerio from'cheerio';
import request from 'request';
import fetch from 'node-fetch';

 const scrapewikiavesSearchByWid = (wikiavesCode) =>{
    const url = "https://www.wikiaves.com.br/wiki/" + wikiavesCode;
    console.log(url);
    return new Promise((resolve, reject)=>{
        request(url, (err, resp, body) =>{
            if(err){
                reject(error);
            }
            let $ = cheerio.load(body);
            let $url = url;
            var $taxonomy2 = $("#taxonomia").text();
            var $taxonomy = {};
            var table = [];
            $("td").each((index, element) => {
                table.push($(element).text());
              });;
            for(var i = 0; i < table.length - 1; i=i+2){
                $taxonomy[table[i]] = table[i+1];
            }


            let $mainImg = $('.wa-capa').attr("src");
            let $ocurrencesMap = $('img[title="Ocorrências registradas no WikiAves"]').attr("src");
    
            var result = {
                url: $url,
                taxonomy: $taxonomy,
                mainImg: $mainImg,
                ocurrencesMap: $ocurrencesMap,
            }
            resolve(result);
        })
    })
}

 const scrapeWikiavesSearch = (searchText) =>{
    const url = "https://www.wikiaves.com.br/getTaxonsJSON.php?term=" + searchText;
    console.log(url);
    return new Promise((resolve, reject)=>{
        request(url, (err, resp, data) =>{
            if(err){
                reject(error);
            }
            jsonData = JSON.parse(data);
            resolve(jsonData);
        })
    })
}

const scrapeWikiavesSpeciesByCity = (cityName) =>{
    const cityId = findCityId(cityName);
    const htmlData = getCityDataInHTML(cityId);
    console.log(htmlData);

}

async function  findCityId(cityName){
    const citySearchBaseUrl = "https://www.wikiaves.com.br/getCidadesJSON.php?";
    const cityParams = new URLSearchParams({term: cityName});
    const citySearchFullUrl = citySearchBaseUrl + cityParams.toString();
    console.log(citySearchFullUrl);

    const response = await fetch(citySearchFullUrl, {method: 'GET'});
    const data = await response.json();

    console.log(data);
    const cityId = data.find(e => e.label === cityName).id;
    console.log(cityId);
    return cityId;
}

async function getCityDataInHTML(cityId){
    const citySearchBaseUrl = "https://www.wikiaves.com.br/especies.php?";
    const cityParams = new URLSearchParams({t: "c"}, {c: cityId});
    const citySearchFullUrl = citySearchBaseUrl + cityParams.toString();
    console.log(citySearchFullUrl);

    const response = await fetch(citySearchFullUrl, {method: 'GET'});
    const data = await response.json();

    return data;

}

const scraper = {scrapewikiavesSearchByWid, scrapeWikiavesSearch, scrapeWikiavesSpeciesByCity, findCityId}
export default scraper;