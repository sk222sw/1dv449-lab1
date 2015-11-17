var getHtml  = require('./getHtml');
var scrapePerson = require('./scrapePerson');
var helper = require('./helper');
var calendar = require('./calendar');

var url = "http://localhost:8080";
var $;

helper.requestHtmlFromUrl(url)
.then(helper.setCheerio)
.then(helper.getHrefs)
.then(calendar.scrapeCalendar)
.then(helper.setCheerio)
.then(calendar.scrapeForPersonUrls)
.then(calendar.scrapeAllPersons)
.then(function(d) {console.log(d)})

// .catch(function(err) {
// 	console.log(err);
// })

