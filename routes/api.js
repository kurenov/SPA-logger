/*
 * SPA-logger
 * by Olzhas Kurenov
 * Single Page Application Page Logger (MEAN Stack)
 * API for log set & get
 */

var app = require('express');
var apiRouter = app.Router();

var Log = require('../models/log');

//LOG ==========================================================================
apiRouter.get('/log',  function(req, res) {
  Log.find({}, function(err, log) {
    if (err) {
      console.log(err.toString());
      res.json({success: false, message: 'Error: ' + err.toString()});
    }
    else {
      res.json({success: true, log: log});
    }
  });
});

apiRouter.post('/log', function(req, res) {
  var log = new Log();
  log.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  log.page =  req.body.page;
  log.referer = req.headers.referer;
  log.ua = req.headers['user-agent'];
  log.language = req.headers['accept-language'];
  log.navigator =  req.body.navigator;
  log.save();
  res.end('success');
});

module.exports = apiRouter;