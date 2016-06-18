var mongoose = require('mongoose');
var OAuthClient  = mongoose.model('OAuthClient');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
    OAuthClient.findOne({ name: username }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }

      // Success
      return callback(null, client);
    });
  }
));


exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
