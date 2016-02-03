var helper = require('./helper');
var cheerio = require('cheerio');

var dinner = function () {};

dinner.prototype.scrapeTimes = function ($) {
	var requestedMovie, requestedDay, requestedTime;
	var freeTables = [];
	$("input[type=radio]").each(function () {
		var dayAndTime = $(this).val();
		var freeTable = {
			day: dayAndTime.substring(0, 3),
			startTime: dayAndTime.substring(3, 5),
			endTime: dayAndTime.substring(5, 7)		
		}
		freeTables.push(freeTable);
	});
	return freeTables;
};

module.exports = new dinner();