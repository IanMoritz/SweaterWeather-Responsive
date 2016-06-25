module.exports = {
    service: 'forecast.io',
    key: '55126e7085ee164957d8e51eff9fa606',
    units: 'f', // Only the first letter is parsed 
    cache: false, // Cache API requests? 
    ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
        minutes: 59,
        seconds: 0
    }
}