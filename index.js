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
  rank: String
});

var Deck = mongoose.model('Deck', cardSchema);
var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


console.log(ranks);
var idPlace = 1;
// for (var i = 0; i < suits.length; i++) {
//   for (var j = 0; j < ranks.length; j++) {
//     Deck.create({ id: idPlace, suit: suits[i], rank: ranks[j]});
//     idPlace += 1;
//   }
// }

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
    console.log('Deck: ', deck[0].length);
    console.log('Data: ', data);
    res.send(data);
  });
})

app.listen(3000, function() {
  console.log('Blakjck listening on 3000');
})
