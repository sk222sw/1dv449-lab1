var scraper = require('./../modules/scraper2.js');
var helper = require('./../modules/helper.js');

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});

	app.post('/scrape', function (req, res) {
		var url = req.body.url;

		// remove / from url string to prevent crash
		if (url.slice(-1) === "/") {
			url = url.slice(0, -1);
		}

		res.cookie("url", url);

		helper.url = url;

		scraper.startScraping(url)
		.then(function (htmlString) {
			res.render('home', {
				serverUrl: url,
				scrape: htmlString
			});
		});
	});

	app.get('/result', function (req, res) {
		var url = req.cookies.url;
		var movie = req.query.movie;
		var time = req.query.time;

		scraper.scrapeRestaurant(url)
		.then(function (result) {
			res.render('home', {
				scrape: result
			});
		})

	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};