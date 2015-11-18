var helper = require('./helper');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = require('request');

var cinema = function() {};

var dayValues = [];
var okDays = [];

cinema.prototype.scrape = function (argDays) {
	dayValues = argDays;
	helper.requestHtmlFromUrl(helper.url + "/cinema")
	.then(helper.setCheerio)
	.then(cinema.prototype.findDay)
	.then(cinema.prototype.findMovies)
	.then(cinema.prototype.doAvailabilityRequests)
};

cinema.prototype.doAvailabilityRequests = function(movies) {
	var promises = [];

	for (var i = 1; i < movies.length + 1; i++) {
		promises.push(helper.requestHtmlFromUrl(helper.url 
				+ "/cinema/check?day=02&movie=0"+i));
	}

	Promise.map(promises, function (element) {
		console.log(element + "\n");
	})

};

cinema.prototype.findMovies = function (args) {
	var days = args[0];
	var $ = args[1];
	var movies = [];

	$("#movie option").each(function () {
		movies.push($(this));
	});

	// remove the first option, whcih isnt a movie
	movies.shift();

	return movies;

	// movies.map(function (movie) {
	// 	console.log(movie.attr("value"));
	// });

	// helper.requestHtmlFromUrl(helper.url + "/cinema/check?day=01&movie=02")
	// .then(function (html) {
	// 	console.log(html);
	// })

};


cinema.prototype.findDay = function ($) {

	var validDays = [];

	for (var key in dayValues) {
		if (dayValues[key]) {
			okDays.push(key);
		}
	}

	okDays.map(function (value) {
		$("#day option").each(function () {
			var thisDay = translateDay($(this).text().toLowerCase());
			if(thisDay === value.toLowerCase()) {
				validDays.push($(this));
			}
		});
	});
	return [validDays, $];

};


function translateDay (day) {
	switch (day.toLowerCase().trim()) {
		case "fredag":
			return "friday";
		case "lördag":
			return "saturday";
		case "söndag":
			return "sunday";
		default: 
			return "unknown day";
	}
}

module.exports = new cinema();