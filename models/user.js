var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  username:    { type: String },
  email:  { type: String },
  password:   { type: String },
  usertype:    { type: String, enum:
    ['user', 'admin' ]
  }
});

module.exports = mongoose.model('User', userSchema);