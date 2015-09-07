var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Book', BookSchema);