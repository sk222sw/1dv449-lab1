var scraper = require('./../modules/scraper2.js');
var cinema = require('./../modules/cinema.js');

// regex instead of repeating app.get for /, home and index
module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
		res.render('home');
	});

	app.post('/scrape', function(req, res) {
		res.render('home', {
			scraper: scraper.scrape(req.body.url)
		});
	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};