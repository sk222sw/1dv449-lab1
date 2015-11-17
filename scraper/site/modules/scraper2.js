var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = require('request');

var getHtml  = require('./getHtml');

var url = "http://localhost:8080";
var $;

requestHtmlFromUrl(url)
.then(setCheerio)
.then(getHrefs)
.then(scrapeCalendar)
.then(setCheerio)
.then(scrapeForPersonUrls)
.then(scrapeAllPersons)
.then(function() {console.log("days")})
.catch(function(err) {
	console.log(err);
})


function scrapeAllPersons(links) {
	var promises = [];
	var allPersonsOks = [];
	var personOks = [];
	var days = {friday: false, saturday: false, sunday: false};	

	for (var i = 0; i < links.length; i++) {
		promises.push(requestHtmlFromUrl(url + "/calendar/" + links[i]));
	}

	Promise(function(resolve, reject) {
			console.log("inte här");
		Promise.map(promises, function(element) {
			var $ = setCheerio(element);
			personOks = [];
			$("tbody tr td").each(function() {
				personOks.push($(this).text().toLowerCase().trim());
			});
			allPersonsOks.push(personOks);
		})
		.then(function compareAnswers() {
			var person0 = allPersonsOks[0];
			var person1 = allPersonsOks[1];
			var person2 = allPersonsOks[2];

			if (person0[0] === person1[0] && person0[0] === person2[0]) {
				days.friday = true;
			}
			if (person0[1] === person1[1] && person0[1] === person2[1]) {
				days.saturday = true;
			}
			if (person0[2] === person1[2] && person0[2] === person2[2]) {
				days.sunday = true;
			}
		})
	})
}

function scrapeForPersonUrls(html) {
	var links = [];
	$("a").each(function() {
		links.push($(this).attr("href"));
	});
	return links;
}

function scrapeCalendar(hrefs) {
	var calendarIndex = hrefs.indexOf("/calendar");

	return requestHtmlFromUrl(url + hrefs[calendarIndex]);
}

function getHrefs($){
	var hrefs = [];
	$("a").each(function(){
		hrefs.push($(this).attr("href"));
	});
	return hrefs;
}

function setCheerio(html){
	$ = cheerio.load(html);
	return $;
}

function requestHtmlFromUrl(url) {
	return new Promise(function(resolve, reject) {
		request(url, function(err, res, html) {
			if (err) { reject(err); }
			else { resolve(html); }
		});
	});
};

