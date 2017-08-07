var express = require('express');
var fs = require('fs');
var app = express();
var db = require('mongodb');
var path = require('path');
var shuffle = require('shuffle-array');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true
});

var Schema = mongoose.Schema;

var cardSchema = new Schema({
  id: Number,
  suit: String,
  rank: String,
  img: String
});

var Deck = mongoose.model('Deck', cardSchema);
//Uncomment below to rebuild 52 card deck

// var suits = ['clubs', 'diamonds', 'hearts', 'spades'];
// var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

// var idPlace = 1;
// for (var i = 0; i < suits.length; i++) {
//   for (var j = 0; j < ranks.length; j++) {
//     var imgLoc = ranks[j] + '_of_' + suits[i] + '.png';
//     Deck.create({ id: idPlace, suit: suits[i], rank: ranks[j], img: imgLoc});
//     idPlace += 1;
//   }
// }

var deck = [];

Deck.find({}, function(err, card) {
  if (err) return handleError(err);
  //console.log(card);
  deck.push(card);
});

app.use(express.static(path.join(__dirname, '/compiled')));

app.get('/getdeck', function(request, response) {
  console.log('sending deck');
  shuffle(deck[0]);
  response.send(JSON.stringify(deck));
})


app.listen(3000, function() {
  console.log('Blakjck listening on 3000');
})
