console.log('The bot is starting');

// Require the modules 
var Forecast = require('forecast');
var Twit = require('twit');
var geocoder = require('geocoder');
var twitconfig = require('./config/twitconfig');
var forecastconfig = require('./config/forecastconfig')
var forecast = new Forecast(forecastconfig);
var T = new Twit(twitconfig);

var r = Math.floor(Math.random() * 100);

//Set up user stream
var stream = T.stream('user');
//Anytime someone tweets at me  
stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){
    
    //Is this a tweet at me?    
    replyTo = eventMsg.in_reply_to_screen_name;
    replyToStandard = replyTo.toLowerCase();

    if (replyToStandard === 'sweaters_today'){
        respond();
    }

    // var fs = require ('fs');    //write JSON 1/3
    // var json = JSON.stringify(eventMsg,null,2);  //write JSON 2/3
    // fs.writeFile("tweet.JSON", json);  //write JSON 3/3

    function respond (){
    body = eventMsg.text; //redudent fix later
    bodyLowerCase = body.toLowerCase();  //redundent fix later
    bodyLoc = bodyLowerCase.replace("@sweaters_today ","");  //body of tweet formated
    from = eventMsg.user.screen_name;  //user's handle
    bioLoc = eventMsg.user.location;  //location in user's twitter bio
    ID = eventMsg.id_str
    if (eventMsg.place != null){  //prevents error if tweet is not geotagged 
        geoLoc = eventMsg.place.full_name;  //location if tweet is geo tagged
    }
    else {
        geoLoc = null
    }   
    
    //LOCATION REPORT
    console.log('LOCATION REPORT:');
    console.log();
    console.log('Tweet from:');
    console.log(from);
    console.log();
    console.log('Body of tweet:');
    console.log(bodyLoc);
    console.log();
    console.log('Location in bio:');
    console.log(bioLoc);
    console.log();
    console.log('Location in geotag:'); 
    console.log(geoLoc);  
    console.log();

    if (geoLoc != null){  //first use geotagged location, this is a full name
        console.log("I'm using Geotag location");
        console.log();
        var locToLL = geoLoc;
        llConversion();
    } 

    else {   //second use location in body of tweet, this should be a zipcode
        console.log("I'm using Body location");
        console.log();
        var zipCode = (bodyLoc.replace(/[^0-9\.]+/g, "").substring(0,5));  //find zipcode
        console.log('The zip code is:');
        console.log(zipCode);
        console.log();
        var locToLL = zipCode;

        if (zipCode.length != 5) {  //make sure there sequential numbers in tweet
            sendError(); 
        }

        else {
            llConversion();
        }
    }
    
        function llConversion (){ 
        geocoder.geocode(locToLL, function ( err, data ) {  //geocoder module saving the day
            if (err) {
                console.log("llConversion error:");
                console.log (err)
                sendError(); 
            }

        // var fs = require ('fs');  //write JSON 1/3
        // var json = JSON.stringify(data,null,2);  //write JSON 2/3
        // fs.writeFile("geocoder.JSON", json);  //write JSON 3/3
        var lat = data.results[0].geometry.location.lat; 
        var long = data.results[0].geometry.location.lng;
        // console.log('Converted to location:');
        // console.log(lat + ', ' + long);
        // console.log(); 
        fCast();

            function fCast(){
                forecast.get([lat, long], true, function( err, result ) {
                    if (err) {
                        console.log('Forecast error:')
                        console.log(err)
                        sendError(); 
                    }
                // var fs = require ('fs');  //write JSON 1/3
                // var json = JSON.stringify(result,null,2);  //write JSON 2/3
                // fs.writeFile("forecast.JSON", json);  //write JSON 3/3

                //Add location that weather API is using so location can be included in tweet
                currentTemp = Math.round(parseFloat(result.currently.temperature, 10));
                currentSummary = result.currently.summary.toLowerCase(),
                dailySummary = result.daily.data[0].summary,
                weeklySummary = result.daily.summary,
                dailyTempMin = result.daily.data[0].apparentTemperatureMin,
                dailyTempMax = result.daily.data[0].apparentTemperatureMax,
                dailyIcon =  result.daily.data[0].icon,
                weatherLat = result.latitude,
                weatherLong = result.longitude,
                status = dailyIcon.replace(/-/g, " ");

                //WEATHER REPORT
                // console.log('WEATHER REPORT:'); 
                // console.log("Current temp:");
                // console.log(currentTemp);
                // console.log(); 
                // console.log("Current summary:");
                // console.log(currentSummary);
                // console.log(); 
                // console.log("Daily summary:");
                // console.log(dailySummary);
                // console.log(); 
                // console.log("Weekly summary:");
                // console.log(weeklySummary);
                // console.log(); 
                // console.log("Daily min temp:");
                // console.log(dailyTempMin);
                // console.log(); 
                // console.log("Daily max temp:");
                // console.log(dailyTempMax);
                // console.log(); 
                // console.log("Daily icon:");
                // console.log(dailyIcon);
                // console.log();
                tneckConversion();

                    function tneckConversion (){
                        if (currentTemp < 0) {
                            var tnecks = 'The weather is calling for all the sweaters you have ';
                        }

                        if (currentTemp >= 0 && currentTemp < 10) {
                            var tnecks = 'The weather is calling for maximum sweaters ';
                        }

                        if (currentTemp >= 10 && currentTemp < 20) {
                            var tnecks = 'The weather is calling for maximum sweaters and a cup of hot choclate.';
                        }

                        if (currentTemp >= 20 && currentTemp < 30) {
                            var tnecks = 'Brrrrr! Bundle up with a wool turtleneck. ';
                        }

                        if (currentTemp >= 30 && currentTemp < 40) {
                            var tnecks = 'The weather is calling for two thick turtlenecks. ';
                        }

                        if (currentTemp >= 40 && currentTemp < 50) {
                            var tnecks = 'One nice sweatershirt should do the trick! ';
                        }

                        if (currentTemp >= 50 && currentTemp < 60) {
                            var tnecks = 'The weather is calling for one light sweater today. ';
                        }

                        if (currentTemp >= 60 && currentTemp < 70) {
                            var tnecks = 'The weather is calling for longsleeves. ';
                        }                        

                        if (currentTemp >= 70 && currentTemp < 80) {
                            var tnecks = "It is too warm for a sweater. Go with shortleeves instead. ";
                        }

                        if (currentTemp >= 80 && currentTemp < 90) {
                            var tnecks = "It's a hot one. No sweaters today. Break out the linen, jorts, and searsucker. ";
                        }

                        if (currentTemp >= 90 && currentTemp < 100) {
                            var tnecks = 'No sweaters today. Grab your sunscreen and shortsleeves! ';
                        }

                        if (currentTemp >= 100) {
                            var tnecks = 'The weather is calling for a bathing suit and A LOT of air conditioning. ';
                        }

                        // if (currentSummary === "rain") {
                        //     var extra = "Add a rain jacket! ";
                        // }
                        // else if (currentSummary === "snow"){
                        //     var extra = "Add your gloves and mittens ";
                        // }
                        // else {
                        //     var extra = "";
                        // }

                        var subWeatherLat = weatherLat.toFixed(4);
                        var subWeatherLong = weatherLong.toFixed(4);

                        var r = Math.floor(Math.random() * 100);
                        nameLocation();

                        function nameLocation (){
                            geocoder.reverseGeocode(subWeatherLat, subWeatherLong, function ( err, data ) {

                                if (err) {
                                    console.log("lnameLocation error:");
                                    console.log (err)
                                    sendError(); 
                                }

                            // var fs = require ('fs');  //write JSON 1/3
                            // var json = JSON.stringify(data,null,2);  //write JSON 2/3
                            // fs.writeFile("reversegeocoder.JSON", json);  //write JSON 3/3

                            nameLocation1 = data.results[0].address_components[1].short_name,
                            nameLocation2 = data.results[0].address_components[4].short_name,

                            composeTweet();

                            function composeTweet (){
                                var newtweet = '@' + from + " " + tnecks + "It is " + currentTemp + " degrees and " + currentSummary + " in " + nameLocation1 + ", " + nameLocation2
                                    console.log("Tweet characters:")
                                    console.log(newtweet.length);
                                    console.log();
                                    sendIt(newtweet);

                                // else if (newtweet.length >= 140) { //shortened version
                                //     var newtweet = '@' + from + tnecks + extra + "It is " + currentTemp + " degrees and " + currentSummary 
                                //     console.log("Tweet characters:")
                                //     console.log(newtweet.length);
                                //     console.log();
                                //     sendIt(newtweet);
                                //}

                                function sendIt(txt) {
                                    var tweet = {
                                        status: (txt),
                                        in_reply_to_status_id: ID
                                    }
                                    console.log(txt);

                                T.post('statuses/update', tweet, tweeted);

                                    function tweeted(err, data, response) {
                                        if (err) {
                                            console.log("Something went wrong with posting:");
                                            console.log(err)
                                        } else {
                                            console.log("It worked!");
                                            console.log();
                                        }
                                    }
                                }
                            }
                            })
                        }
                    }
                })
            }
        })
        }   
    }
};


function sendError(){  //relearn how to use functions
    console.log(from);
    newTweet = '@' + from + ' Sorry! Looks like your tweet was not geotagged and it did not include a zipcode.'
    sendIt(newTweet);  
}

function exit(){
    console.log("weird error");
}