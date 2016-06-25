var test = require('.././');

require('domready')(function () {
	console.log('dom ready, starting test.');

	var body = document.getElementsByTagName("body")[0];
    
	var container = document.createElement('div');
	container.setAttribute("id", "container");
	body.appendChild(container);

	
	shortURL();

	function shortURL() {
		console.log('SHORT URL');
		test.short("http://miguelmoraleda.com", shortComplete);
	}

    function shortComplete(err, response) {
		if(err) {
			throw err;
		}

		if(response) {
			console.log('kind: ', response.kind);
			console.log('id: ', response.id);
			console.log('longUrl: ', response.longUrl);
		}
		console.log('-----------------');
		expandURL(response.id);
    }

    function expandURL(url) {
    	console.log('EXPAND URL: ', url);
		test.expand(url, expandComplete);
    }

    function expandComplete(err, response) {
		if(err) {
			throw err;
		}
		if(response) {
			console.log('kind: ', response.kind);
			console.log('id: ', response.id);
			console.log('longUrl: ', response.longUrl);
			console.log('status: ', response.status);
		}
    }
});
