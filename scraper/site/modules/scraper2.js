var getHtml  = require('./getHtml');
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
			// console.log(result);
			resolve(result);
		});
	});

};

exports.scrapeRestaurant = function (url) {
	return new Promise(function (resolve, reject) {
		helper.requestHtmlFromUrl(url + "/dinner")
		.then(helper.setCheerio)
		.then(dinner.scrapeTimes)
		.then(function (result) {
			resolve(result)
		})
	})
};

// scrapeDinner();