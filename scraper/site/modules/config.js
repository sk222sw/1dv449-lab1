module.exports = function(app) {
	var handlebars = require('express-handlebars');

	app.engine('handlebars', handlebars({defaultLayout: "main"}));
	app.set('view engine', 'handlebars');
	
	app.set(__dirname + "/public");

	app.set('port', process.env.PORT || 3030);
};
