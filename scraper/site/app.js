var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - not found');
});

app.listen(app.get('port'), function() {
	console.log('Started on localhost: ' + app.get('port'));
})

