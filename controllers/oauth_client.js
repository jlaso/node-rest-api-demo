var mongoose = require('mongoose');
var OAuthClient  = mongoose.model('OAuthClient');

// Create endpoint /api/clients for POST
exports.createOAuthClient = function(req, res) {
  // Create a new instance of the Client model
  var client = new OAuthClient();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id || 0;

  // Save the client and check for errors
  client.save(function(err) {
    if (err) res.send(err);

    res.json({ message: 'OAuthClient added to the locker!', data: client });
  });
};

//// Create endpoint /api/clients for GET
//exports.getClients = function(req, res) {
//  // Use the Client model to find all clients
//  Client.find({ userId: req.user._id }, function(err, clients) {
//    if (err)
//      res.send(err);
//
//    res.json(clients);
//  });
//};
