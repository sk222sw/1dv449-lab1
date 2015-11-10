var express = require('express');
var app = express();

var config = require('./modules/config.js');
require('./modules/routes.js')(app);

var handlebars = require('express-handlebars')
		.create({deafultLayour: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', config.port);

app.listen(app.get('port'), function() {
	console.log('Started on localhost: ' + app.get('port'));
})

