var promise = require('promise');
var promise = require("promise");
var request = require("request");
var cheerio = require("cheerio");

var url = "http://localhost:8080";

requestp(url)
	.then(function(html){

		var $ = cheerio.load(html);
		var listElements = [];


		$("a").each(function() {
			listElements.push($(this).attr("href"));
		})

		scrapeLink(listElements[2]);

		exports.scrape = "nothing to show yet";
	});

function requestp(url) {
    return new promise(function (resolve, reject) {
        request(url, function (err, res, html) {
            resolve(html);
        });
    });
}


function scrapeLink(href) {
	requestp(url+href)
		.then(function(html) {
			var $ = cheerio.load(html);

			console.log($("body").children().first().first());

			// console.log(html);

		})
}