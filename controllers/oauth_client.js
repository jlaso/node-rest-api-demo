var mongoose = require('mongoose');
var OAuthClient = mongoose.model('OAuthClient');
var utils = require('../lib/utils');

// Create endpoint /api/clients for POST
exports.createOAuthClient = function (req, res) {

    utils.checkMatches(req.body, ["name", "id", "secret"], function (err) {
        if (err !== null) {
            res.status(400).jsonp({'error': err});
            return false;
        }

        utils.checkIfExists(OAuthClient, req.body.id, function (err) {
            if (err) {
                res.status(200).jsonp({'error': err});
                return false;
            }

            // Create a new instance of the Client model
            var client = new OAuthClient({
                name: req.body.name,
                id: req.body.id,
                secret: req.body.secret,
                userId: req.user._id || 0
            });

            // Save the client and check for errors
            client.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'OAuthClient added to the locker!', data: client});
            });

        });
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
