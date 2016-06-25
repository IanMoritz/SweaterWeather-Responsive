## browser-googl

This module let you short or expand URLs using the goo.gl API. You can use this module in the browser and even you could use browserify with it.

## Install

```bash
$ npm install browser-googl
```

## Usage

```js
var browserGoogl = require('browser-googl');

browserGoogl.short("http://miguelmoraleda.com", function(err, response) {
    if(err) {
        throw err;
    }

    if(response) {
        console.log('kind: ', response.kind);
        console.log('id: ', response.id);
        console.log('longUrl: ', response.longUrl);
    }
});

test.expand("http://goo.gl/vJff0N", function(err, response) {
    if(err) {
        throw err;
    }
    if(response) {
        console.log('kind: ', response.kind);
        console.log('id: ', response.id);
        console.log('longUrl: ', response.longUrl);
        console.log('status: ', response.status);
    }
});


```


## Wanna test before using?

```js
git clone https://github.com/miguelmoraleda/youtube-iframe-player
cd browser-googl
npm install
npm install -g beefy
beefy test/index.js 9000
```

## Dependency 

* [browser-request](http://github.com/iriscouch/browser-request)

## Contributing

We welcome contributions of all kinds from anyone.

## Release History

* 1.0.0 Initial release
