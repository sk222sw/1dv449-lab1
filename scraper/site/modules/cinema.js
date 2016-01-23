var helper = require('./helper');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = require('request');

var cinema = function() {};

var dayValues = [];
var okDays = [];

cinema.prototype.scrape = function (argDays) {
	dayValues = argDays;
	return helper.requestHtmlFromUrl(helper.url + "/cinema")
	.then(helper.setCheerio)
	.then(cinema.prototype.findDay)
	.then(cinema.prototype.findMovies)
	.then(cinema.prototype.doAvailabilityRequests)
	.then(cinema.prototype.makeHtml)
};

cinema.prototype.makeHtml = function (statuses) {
	var parsed = [];
	var movies = [];

	for (var i = 0; i <= statuses.length; i++) {
		if (statuses[i] !== undefined) {
			parsed.push(JSON.parse(statuses[i]));
		}
	}

	var movie1 = parsed[0];
	var movie2 = parsed[1];
	var movie3 = parsed[2];

	movies.push(movie1);
	movies.push(movie2);
	movies.push(movie3);

	var ret = "<ul>";
	for (var i = 0; i <= movies.length; i++) {
		if (movies[i] !== undefined) {
			for (var j = 0; j <= movies[i].length; j++) {
				if (movies[i][j] !== undefined) {
					if (movies[i][j].status == 1) {
						ret += makeLi(movies[i][j].time, getMovieName(movies[i][j].movie));
					}
				}
			}
		}
	}

	ret += "</ul>";
	return ret;
}

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

function getMovieId (name) {
	switch (name) {
		case "Söderkåkar": 
			return 1;
		case "Fabian Bom": 
			return 2;
		case "Pensionat Paradiset": 
			return 3;
	}	
}


function makeLi (time, movie, day) {


	return "<li>" + movie + ": " + time + "<a href='/result?movie=" + getMovieId(movie) + "&day=" + day + "&time=" + time.slice(0, 2) + "'>" + " Boka" + "</a>" + "</li>";
}

cinema.prototype.doAvailabilityRequests = function(movies) {
	var promises = [];
	var movieStatus = [];

	for (var i = 1; i < movies.length + 1; i++) {
		promises.push(helper.requestHtmlFromUrl(helper.url 
				+ "/cinema/check?day=02&movie=0"+i));
	}

	return Promise.map(promises, function (element) {
		movieStatus.push(element);
	})
	.then(function () {
		return movieStatus;
	})

};

cinema.prototype.findMovies = function (args) {
	var days = args[0];
	var $ = args[1];
	var movies = [];

	console.log(days[0].value);

	$("#movie option").each(function () {
		movies.push($(this));
	});

	// remove the first option, whcih isnt a movie
	movies.shift();

	return movies;
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
	console.log(validDays.length)
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