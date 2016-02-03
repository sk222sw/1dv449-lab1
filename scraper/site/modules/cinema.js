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
	.then(cinema.prototype.findPossibleDays)
	.then(cinema.prototype.findMovies)
	.then(cinema.prototype.doAvailabilityRequests)
	.then(cinema.prototype.makeHtml)
};

cinema.prototype.makeHtml = function (days) {
	var ret = "<ul>";

	days.forEach(function(day) {
		day.movies.forEach(function(movie) {

			movie.times.forEach(function(time) {
				ret += makeLi(time, movie.title, movie.day, movie.movieId);
			})
		})
	})

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


function makeLi (time, movie, day, movieId) {
	return "<li>" + movie + ": " + unTranslateDay(day) + " " + time + "<a href='/result?movie=" + movieId + "&day=" + day + "&time=" + time.slice(0, 2) + "'>" + " Boka" + "</a>" + "</li>";
}

cinema.prototype.doAvailabilityRequests = function(days) {
	var promises = [];
	var movieStatus = [];
	var dayId;
	var movieId;

	days.forEach(function(day) {
		if (day.day === "friday") {
			dayId = "01";
		} else if (day.day === "saturday") {
			dayId = "02";
		} else if (day.day === "sunday") {
			dayId = "03";
		}

		for (var i = 0; i < day.movies.length; i++) {
			movieId = i+1;
			day.movies[i].movieId = "0" + movieId;
			day.movies[i].times = [];
			day.movies[i].day = day.day;

			var movieRequest = {}
			movieRequest.promise = helper.requestHtmlFromUrl(helper.url 
					+ "/cinema/check?day="+dayId+"&movie=0"+movieId);
			promises.push(movieRequest.promise);
		}
	})


	return Promise.map(promises, function(element) {
		movieStatus.push(element);
	})
	.then(function() {
		movieStatus.forEach(function(ms) {
			ms = JSON.parse(ms);
			for (var i = 0; i < ms.length; i++) {
				days.forEach(function(day) {
					day.movies.forEach(function(movie) {
						if (ms[i].status === 1) {
							if (ms[i].movie === movie.movieId) {
								movie.times.push(ms[i].time)
							}
						}
					})
				})
			}
		})

		return days;
	})

};

// args = validdays, cheerio
cinema.prototype.findMovies = function (args) {
	var days = args[0];
	var $ = args[1];

	days.forEach(function(day) {
		$("#movie option").each(function () {
			var movie = {};
			movie.title = $(this).html();
			day.movies.push(movie);

		});
		// remove the first option, which isnt a movie
		day.movies.shift();
	})

	return days;
};


cinema.prototype.findPossibleDays = function ($) {
	var validDays = [];

	// ugly hack (?) cause okDays never empties otherwise
	if (okDays.length) {
		okDays = [];
	}
	
	for (var key in dayValues) {
		if (dayValues[key]) {
			okDays.push(key);
		}
	}
	console.log(okDays)
	okDays.map(function (value) {
		$("#day option").each(function () {
			var thisDay = translateDay($(this).text().toLowerCase());
			if(thisDay === value.toLowerCase()) {
				// validDays.push($(this));
				var dayObject = {
					day: thisDay,
					movies: []
				}
				validDays.push(dayObject);
			}
		});
	});
	console.log(validDays);
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

function unTranslateDay(day) {
	switch (day.toLowerCase().trim()) {
		case "friday":
			return "fredag";
		case "saturday":
			return "lördag";
		case "sunday":
			return "söndag";
		default: 
			return "unknown day";
	}	
};

module.exports = new cinema();