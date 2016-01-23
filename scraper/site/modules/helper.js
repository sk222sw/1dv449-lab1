var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = require('request');


var helper = function () {};

helper.prototype.url = "";


helper.prototype.requestHtmlFromUrl = function(url) {
	helper.url = url;
	return new Promise(function(resolve, reject) {
		request(url, function(err, res, html) {
			if (err) { reject(err); }
			else { resolve(html); }
		});
	});
};

helper.prototype.setCheerio = function(html){
	$ = cheerio.load(html);
	return $;
};

helper.prototype.getHrefs = function($){
	var hrefs = [];
	$("a").each(function(){
		hrefs.push($(this).attr("href"));
	});
	return hrefs;
};

helper.prototype.getDomUrl = function (argument) {
	
}

module.exports = new helper();