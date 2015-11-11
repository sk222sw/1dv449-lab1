var promise = require('promise');
var promise = require("promise");
var request = require("request");
var cheerio = require("cheerio");

var url = "http://localhost:8080";

requestp(url)
	.then(function(data){
		console.log(data);
		exports.scrape = data;
	});

function requestp(url) {
    return new promise(function (resolve, reject) {
        request(url, function (err, res, html) {
            resolve(html);
        });
    });
}