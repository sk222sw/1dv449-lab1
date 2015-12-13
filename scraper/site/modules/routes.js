var scraper = require('./../modules/scraper2.js');
var helper = require('./../modules/helper.js');

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});

	app.post('/scrape', function (req, res) {
		var url = req.body.url;

		if (url.slice(-1) === "/") {
			console.log("IS /");
			url = url.slice(0, -1);
		}

		helper.url = url;
		scraper.startScraping(url)
		.then(function (htmlString) {
			res.render('home', {
				scrape: htmlString
			});
		});
	});

	app.get('/result', function (req, res) {

		// scraper.scrapeRestaurant();

		res.render('home', {
			scrape: "HEJ"
		});
	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};