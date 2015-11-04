var express = require('express');
var app = express();

var config = require('./modules/config.js');
require('./modules/routes.js')(app);

var handlebars = require('express3-handlebars')
		.create({deafultLayour: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));


app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - not found');
});

app.set('port', config.port);

app.listen(app.get('port'), function() {
	console.log('Started on localhost: ' + app.get('port'));
})

