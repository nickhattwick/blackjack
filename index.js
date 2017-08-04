var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Blkjc')
})

app.listen(3000, function() {
  console.log('Blakjck listening on 3000');
})
