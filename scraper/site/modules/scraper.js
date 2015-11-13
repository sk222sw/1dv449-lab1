var promise = require('promise');
var promise = require("promise");
var request = require("request");
var cheerio = require("cheerio");

var getHtml = require("./getHtml");

var url = "http://localhost:8080";

/////////////
// scraper starts here atm
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



//////////////
// request-promise a url
// return html string
function requestp(url) {
    return new promise(function (resolve, reject) {
        request(url, function (err, res, html) {
            resolve(html);
        });
    });
}

/////////////
// scrape a link with href route
// 
function scrapeLink(href) {

	var link = url + href;

	requestp(link)
		.then(function(html) {
			var $ = cheerio.load(html);

			switch(href) {
				case "/calendar":
					scrapeCalendar(html, link);
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

function scrapeCalendar(html, link) {
	var personLinks = getHtml.getElements(html, "a", "href");

	requestp(link + "/" + personLinks[0])
		.then(function(html) {
			scrapePerson(html);
		});
}

function scrapePerson(html) {
	var days = [];
	var ok = [];
	var okDays = [];

	console.log(html);

	days = getHtml.getElements(html, "thead tr th", false);
	ok = getHtml.getElements(html, "tbody tr td", false);

	getHtml.getElementsText(days);

	for (var i = 0; i < days.length; i++) {
		console.log(days[i].text());
	}

}