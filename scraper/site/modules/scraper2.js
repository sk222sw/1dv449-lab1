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
.then(scrapePersons)

function scrapePersons(links) {
	for(var i = 0; i < links.length; i++){
		requestHtmlFromUrl(url+links[i])
		.then(function() {
				
		})
	}
}

function scrapeForPersonUrls(html) {
	var links = [];
	$("a").each(function() {
		links.push($(this).attr("href"));
	})
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

