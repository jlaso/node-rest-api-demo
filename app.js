var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose'),
    session = require('express-session');

// Connection to DB
mongoose.connect('mongodb://localhost/momo', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
    throw err;
  }
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: '4Fg4w2gBhm9e#1fgEw0=%Gh3Frt4RqWpFv6',
  saveUninitialized: true,
  resave: true
}));


// Welcome Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("This is MoMo !");
});
app.use(router);

// Import Models
require('./models/user')(app, mongoose);
require('./models/oauth_client')(app, mongoose);
require('./models/oauth_token')(app, mongoose);
require('./models/oauth_code')(app, mongoose);

// Import Controllers
var UserCtrl = require('./controllers/user');
var ClientCtrl = require('./controllers/oauth_client');
var AuthCtrl = require('./controllers/auth');

// API routes
var api = express.Router();

// USERS ROUTES
api.route('/users')
  .get(UserCtrl.findAllUsers)
  .post(UserCtrl.addUser);

api.route('/users/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.updateUser)
  .delete(UserCtrl.deleteUser);

// OAUTH CLIENTS ROUTES
api.post('/oauth-clients', AuthCtrl.isClientAuthenticated, ClientCtrl.createOAuthClient);

app.use('/api', api);


// OAUTH2 AUTH ROUTES

var oauth2Controller = require('./controllers/oauth2');

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(AuthCtrl.isAuthenticated, oauth2Controller.authorization)
  .post(AuthCtrl.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(AuthCtrl.isClientAuthenticated, oauth2Controller.token);


app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});

