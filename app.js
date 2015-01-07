var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')
var Models = require('./models');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/asterix');
var models = Models(mongoose);
var Log = models.Log;

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/post', function(req, res) {
  var log = new Log({
    log: req.body.log,
    posted_by: req.body.posted_by
  });

  log.save(function(err) {
    if (err) {
      return res.status(500).
        send('Something failed. Try again or contact the admin');
    }
    return res.send('Ah! Thanks')
  });
});

app.get('/all', function(req, res) {
  Log.find({})
  .sort({created_at: 'desc'})
  .exec(function (err, results) {
    if (err) {
      res.status(500).
      send('Something failed. Try again or contact the admin');
    } else {
      res.send(results)
    }
  });
});

var server = app.listen(process.env.PORT || 8002, function() {
  console.log('listening on port %d', server.address().port);
});
