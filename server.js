// server.js

// BASE SETUP
// =============================================================================



// mongoose set up
var mongoose = require('mongoose');             //require mongoose
mongoose.Promise = global.Promise;              // used to fix promise deprecation
mongoose.connect('mongodb://localhost:27017/tweets', {useMongoClient: true})     //use mongoclient to fix deprecation

// model set up
var Tweet = require('./models/tweet');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// cors set up
var cors = require('cors');
app.use(cors());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

process.env.PORT = 8081; var port = process.env.PORT;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // console.log('Incoming: ' + req);
    // console.log('Outgoing: ' + res);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/tweets')
    // create a tweet (accessed at POST http://localhost:8080/api/tweets)
    .post(function(req, res) {
        
        var tweet = new Tweet();            // create a new instance of the Tweet model
        tweet.text = req.body.text;         // set the tweets name (comes from the request)
        tweet.courseID = req.body.courseID; // set the tweets course id
        tweet.time = req.body.time;            // sets the tweets timestamp
        tweet.save(function(err) { if (err){ res.send(err); }
            res.json({"msg": "success"})
        });
        
        console.log('Message "' + tweet.text + '" created in course ' + tweet.courseID + " at " + tweet.time);
    })
    
     // get all the tweets (accessed at GET http://localhost:8080/api/tweets)
    .get(function(req, res) {
        Tweet.find(function(err, tweets) {
            console.log('Sending out ' + tweets.length + ' messages!');
            if (err) { console.log("error: " + err); res.send(err);}
            res.send(tweets);
        });
    });
    
    
// router.route('/tweets/:tweet_id')
//     // get the tweet with that id (accessed at GET http://localhost:8080/api/bears/:tweet_id)
//     .get(function(req, res) {
//         Tweet.findById(req.params.tweet_id, function(err, tweet) {
//             if (err){ res.send(err); }
//             res.json(tweet);
//         });
//     })
//     // update the tweet with this id (accessed at PUT http://localhost:8080/api/bears/:tweet_id)
//     .put(function(req, res) {

//         // use our tweet model to find the tweet we want
//         Tweet.findById(req.params.tweet_id, function(err, tweet) {
//             if (err) { res.send(err);}
//             tweet.name = req.body.name;  // update the bears info

//             // save the tweet
//             tweet.save(function(err) {
//                 if (err){ res.send(err); }
//                 res.json({ message: 'Tweet updated!' });
//             });

//         });
//     })
//     // delete the tweet with this id (accessed at DELETE http://localhost:8080/api/tweets/:tweet_id)
//     .delete(function(req, res) {
//         Tweet.remove({
//             _id: req.params.tweet_id
//         }, function(err, tweet) {
//             if (err){ res.send(err);}

//             res.json({ message: 'Successfully deleted' });
//         });
//     });    
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Waiting for messages on port ' + port);