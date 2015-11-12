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
		});

		scrapeLink(listElements[0]);

		exports.scrape = "nothing to show yet";
	});

function extractElements(html, element, attribute) {
	var elements = [];
	
	var $ = cheerio.load(html);

	$(element).each(function() {
		elements.push($(this).attr(attribute));
	});

	console.log(elements);
}

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
			
			switch(href) {
				case "/calendar":
					scrapeCalendar(html);
					break;
				case "/cinema":
					console.log("you chose cinema");
					break;
				case "/dinner":
					console.log("you chose dinner");
					break;
				default:
					console.log("you chose life");
			}


		});
}

function scrapeCalendar(html) {
	extractElements(html, "a", "href");
}