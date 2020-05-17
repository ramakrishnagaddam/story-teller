var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Story', Schema({
    _id: Schema.Types.ObjectId,
    storyName: String,
    storyDesc: String,
    credits: String,
    storyURL: Buffer,
    volume: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Volume'
    }
}));
