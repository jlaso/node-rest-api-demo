exports.uid = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.checkMatches = function(data, config, callback) {
    var result = [];
    for(var i=0; i<config.length; i++){
        var key = config[i];
        if (typeof data[key] == "undefined"){
            result.push("Missing '"+key+"' key on source.")
        }
    }

    if (result.length > 0)
        return callback(result);
    else
        return callback(null);
};

exports.checkIfExists = function (DbObject, criteria, callback) {

    if (typeof criteria == "number"){
        criteria = { id: parseInt(criteria) };
    }

    DbObject.find(criteria, function(err, obj){
        if(err) {
            return callback(err);
        }
        if(obj.length > 0){
            return callback('Item with id='+criteria.id+' already exists in the DB.');
        }
        return callback(null);
    });

};
