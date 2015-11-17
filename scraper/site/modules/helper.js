var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = require('request');


var helper = function () {};

helper.prototype.url = "http://localhost:8080";

helper.prototype.requestHtmlFromUrl = function(url) {
	return new Promise(function(resolve, reject) {
		request(helper.prototype.url, function(err, res, html) {
			if (err) { reject(err); }
			else { resolve(html); }
		});
	});
};

helper.prototype.setCheerio = function(html){
	$ = cheerio.load(html);
	return $;
}

helper.prototype.getHrefs = function($){
	var hrefs = [];
	$("a").each(function(){
		hrefs.push($(this).attr("href"));
	});
	return hrefs;
}

module.exports = new helper();