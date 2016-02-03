var scrapePerson = require('./scrapePerson');
var helper = require('./helper');
var calendar = require('./calendar');
var cinema = require('./cinema');
var Promise = require('bluebird');
var dinner = require('./dinner');

var scraper = function () {};
exports.scrape = "tomt";

// exports.startScraping = function (url) {
// 	return new Promise(function (resolve, request) {
// 		return helper.requestHtmlFromUrl(helper.url);
// 	})
// };

exports.startScraping = function (url) {

	return new Promise(function  (resolve, reject) {
		helper.requestHtmlFromUrl(url)
		.then(helper.setCheerio)
		.then(calendar.scrapeCalendar)
		.then(helper.setCheerio)
		.then(calendar.scrapeForPersonUrls)
		.then(calendar.scrapeAllPersons)
		.then(cinema.scrape)
		.then(function  (result) {
			resolve(result);
		});
	});

};

exports.scrapeRestaurant = function (url, movie, time, day) {
	return new Promise(function (resolve, reject) {
		helper.requestHtmlFromUrl(url + "/dinner")
		.then(helper.setCheerio)
		.then(dinner.scrapeTimes)
		.then(function(dinnerTimes) {
			var dinnerMatches = [];
			var shortDayName = changeDayName(day);
			dinnerTimes.forEach(function(dinnerTime) {
				if (parseInt(dinnerTime.startTime, 10) === parseInt(time, 10)+2
					&& shortDayName === dinnerTime.day) {
					var dinnerMovieMatch = {
						day: day,
						movie: getMovieName(movie),
						movieStart: time,
						dinnerStart: dinnerTime.startTime
					}
					dinnerMatches.push(dinnerMovieMatch);
				}
			})
			return dinnerMatches;
		})
		.then(function (result) {
			resolve(result)
		})
	})
};

function changeDayName(day) {
	switch (day.toLowerCase().trim()) {
		case "friday":
			return "fre";
		case "saturday":
			return "lor";
		case "sunday":
			return "son";
		default: 
			return "unknown day";
	}
};

function getMovieName (id) {
	switch (id) {
		case "01": 
			return "Söderkåkar";
		case "02": 
			return "Fabian Bom";
		case "03": 
			return "Pensionat Paradiset";
	}
}