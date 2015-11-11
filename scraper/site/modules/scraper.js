var promise = require('promise');
var promise = require("promise");
var request = require("request");
var cheerio = require("cheerio");

var url = "http://localhost:8080";
// exports.scrape = "hej";

requestp(url)
	.then(function (data) {
    	saker = data;
	})
	.then(function(){
		console.log(saker);
		exports.scrape = saker;
	});

function requestp(url) {
    return new promise(function (resolve, reject) {
        request(url, function (err, res, body) {
            resolve(body);
        });
    });
}
