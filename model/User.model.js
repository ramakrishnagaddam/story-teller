var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Users', Schema({
    _id: Schema.Types.ObjectId,
    emailID: String,
    credits: Number,
    purchases: [{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Volume'
    }]
}))

