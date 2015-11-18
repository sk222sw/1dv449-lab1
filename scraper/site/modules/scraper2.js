var getHtml  = require('./getHtml');
var scrapePerson = require('./scrapePerson');
var helper = require('./helper');
var calendar = require('./calendar');
var cinema = require('./cinema');


helper.requestHtmlFromUrl(helper.url)
.then(helper.setCheerio)
.then(helper.getHrefs)
.then(calendar.scrapeCalendar)
.then(helper.setCheerio)
.then(calendar.scrapeForPersonUrls)
.then(calendar.scrapeAllPersons)

.then(cinema.scrape)
.then(function (stuff) {
	console.log(stuff);
})


// .catch(function(err) {
// 	console.log(err);
// });

exports.scrape = function (t) {
	return t;
}