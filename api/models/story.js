const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    storyName: String,
    storyDesc: String,
    storyImage: String,
    credits: String,
    storyURL: String,
    volume: {
        type: Schema.Types.ObjectId,
        ref: "volume" 
    }
});

module.exports = mongoose.model("story", StorySchema);