var cheerio = require('cheerio');

var getHtml = function() {};

//////////////
// extract all chosen elements
// args: html string, chosen element, 
//		optional element attribute (attribute name or FALSE)
// return array
getHtml.prototype.getElements = function(html, element, attribute) {
	var elements = [];
	
	var $ = cheerio.load(html);

	if (!attribute) {
		$(element).each(function() {
			elements.push($(this));
		});
	} else {
		$(element).each(function() {
			elements.push($(this).attr(attribute));
		});
	}

	return elements;
};

//////////////
// Extracts text from html elements
// args: array of html elements
// returns array with texts from elements
getHtml.prototype.getElementsText = function (elements) {
	var elementsText = [];
	for (var i = 0; i < elements.length; i++) {
		var thisText = elements[i].text();
		elementsText.push(thisText);
	}
	return elementsText;
};

module.exports = new getHtml();