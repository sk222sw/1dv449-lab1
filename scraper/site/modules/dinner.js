var helper = require('./helper');
var cheerio = require('cheerio');

var dinner = function () {};

dinner.prototype.scrapeTimes = function (html) {

	// console.log($("body").html());
	$("input[type=radio]").each(function () {
		// console.log($(this).val());
	});
	
};

module.exports = new dinner();