var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {
  fs.readFile('./client/index.html', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Data: ', data);
    res.send(data);
  });
})

app.listen(3000, function() {
  console.log('Blakjck listening on 3000');
})
