var helper = require('./helper');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var calendar = function () {};

calendar.prototype.scrapeCalendar = function (hrefs) {
	// console.log(hrefs);
	// var calendarIndex = hrefs.indexOf("/calendar");
	return helper.requestHtmlFromUrl(helper.url + "/calendar");
};


calendar.prototype.scrapeAllPersons = function(links) {
	var promises = [];
	var allPersonsOks = [];
	var personOks = [];
	var days = {friday: false, saturday: false, sunday: false};	

	for (var i = 0; i < links.length; i++) {
		promises.push(helper.requestHtmlFromUrl(helper.url + "/calendar/" + links[i]));
	}

	return Promise.map(promises, function(element) {
		var $ = helper.setCheerio(element);
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
	.then(function(){
		return days;
	});
};

calendar.prototype.scrapeForPersonUrls = function($) {
	var links = [];
	
	$("a").each(function() {
		links.push($(this).attr("href"));
	});
	return links;
};


module.exports = new calendar();