var cheerio = require('cheerio');
var request = require('request');

exports.scrapewikiavesSearchByWid = (wikiavesCode) =>{
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

exports.scrapeWikiavesSearch = (searchText) =>{
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