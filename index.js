var express = require('express');
var fs = require('fs');
var app = express();
var db = require('mongodb');
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

var suits = ['clubs', 'diamonds', 'hearts', 'spades'];
var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

var idPlace = 1;
for (var i = 0; i < suits.length; i++) {
  for (var j = 0; j < ranks.length; j++) {
    var imgLoc = ranks[j] + '_of_' + suits[i] + '.png';
    Deck.create({ id: idPlace, suit: suits[i], rank: ranks[j], img: imgLoc});
    idPlace += 1;
  }
}

var deck = [];

Deck.find({}, function(err, card) {
  if (err) return handleError(err);
  console.log(card);
  deck.push(card);
});

console.log(deck);

app.get('/', function(req, res) {
  fs.readFile('./client/index.html', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Deck: ', deck[0].length, deck);
    console.log('Data: ', data);
    res.send(data);
  });
})

app.listen(3000, function() {
  console.log('Blakjck listening on 3000');
})
