var promise = require('promise');
var request = require("request");
var cheerio = require("cheerio");

var getHtml = require("./getHtml");

var url = "https://weekend-booking-sk222sw.c9users.io/";
var persons = [];

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
	}).then(function() {
	});


//////////////
// request-promise a url
// return html string
function requestp(url) {
    return new promise(function (resolve, reject) {
        request(url, function (err, res, html) {
        	if (err) {
        		throw err;
        	}
        	else resolve(html);
        });
    });
}

/////////////
// scrape a link with href route
function scrapeLink(href) {
	href = href.substr(1);
	var link = url + href;
	requestp(link)
		.then(function(html) {
			// var $ = cheerio.load(html);

			switch(href) {
				case "calendar":
					scrapeCalendar(html, link);
					console.log("gotta");
					break;
				case "/cinema":
					break;
				case "/dinner":
					break;
				default:
			}


		})
		.then(function(){
			exports.scrape = persons;
		});
}

function scrapeCalendar(html, link) {
	var personLinks = getHtml.getElements(html, "a", "href");
	// var persons = [];
	var person;

	for (var i = 0; i < personLinks.length; i++) {
		requestp(link + "/" + personLinks[i])
			.then(function(html) {
				person = scrapePerson(html);
				persons.push(person);
			});
	}
}

function scrapePerson(html) {
	var name = getHtml.getElementsText(getHtml.getElements(html, "h2", false));
	var days = getHtml.getElementsText(getHtml.getElements(html, "thead tr th", false));
	var ok = getHtml.getElementsText(getHtml.getElements(html, "tbody tr td", false));

	var person = {name: name, days: days, ok: ok};
	return person;
}

function getOkDays() {
	// exports.scrape = persons;
}