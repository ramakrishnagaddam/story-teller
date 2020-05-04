const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VolumeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    purchased: Boolean,
    stories: [{
        type: Schema.Types.ObjectId,
        ref: "story" 
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
});

module.exports = mongoose.model("volume", VolumeSchema);