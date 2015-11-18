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

// .catch(function(err) {
// 	console.log(err);
// });

