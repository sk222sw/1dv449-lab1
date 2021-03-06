module.exports = function(app) {
	var handlebars = require('express-handlebars');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser')

	app.engine('handlebars', handlebars({defaultLayout: "main"}));
	app.set('view engine', 'handlebars');	
	app.set(__dirname + "/public");
	// app.use(require('body-parser')());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.set('port', process.env.PORT || 3030);
};
