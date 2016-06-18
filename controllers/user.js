var mongoose = require('mongoose');
var User  = mongoose.model('User');

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
    console.log('GET /users')
    User.find(function(err, users) {
        if(err) res.send(500, err.message);

        res.status(200).jsonp(users);
    });
};

//GET - Return a user with specified ID
exports.findById = function(req, res) {
    console.log('GET /user/' + req.params.id);
    User.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);

        res.status(200).jsonp(user);
    });
};

//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {
    console.log('POST /user');
    console.log(req.body);

    var user = new User({
        username:  req.body.username,
        email:     req.body.email,
        password:  req.body.password,
        usertype:  req.body.usertype
    });

    user.save(function(err, user) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.username =  req.body.username;
        user.email =     req.body.email;
        user.password =  req.body.password;
        user.usertype =  req.body.usertype;

        user.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.deleteUser = function(req, res) {
    console.log('DELETE /user '+req.params.id);

    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).send();
        })
    });
};


