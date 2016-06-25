var request = require("browser-request");

/**
 * This module is for short or expands URLs using goo.gl API.
 * @type {Object}
 */
module.exports = {
  short: function(url, onComplete) {
    request(
      { 
        method:'POST', 
        url:'https://www.googleapis.com/urlshortener/v1/url', 
        body:'{\"longUrl\": \"' + url + '\" }', 
        json:true
      }, 
      function(err, response, body) {
        onComplete(err, body);
      });
  },
  expand: function(url, onComplete) {
    request(
      { 
        method:'GET', 
        url:'https://www.googleapis.com/urlshortener/v1/url?shortUrl=' + url,
        json:true
      }, 
      function(err, response, body) {
        onComplete(err, body);
      });
  }
};
