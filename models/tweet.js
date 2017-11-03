// esimps27-lab-3/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tweetSchema   = new Schema({
    text: String,
    courseID: String,
    time: String
});

module.exports = mongoose.model('Tweet', tweetSchema);