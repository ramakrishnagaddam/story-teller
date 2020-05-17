var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', Schema({
    _id: Schema.Types.ObjectId,
    categoryName: String,
    categoryImageURL: Buffer,
    categoryDesc: String,
    volume: [{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Volume'
    }]
}));
