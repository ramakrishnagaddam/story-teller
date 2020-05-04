const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    categoryImageURL: String,
    categoryDesc: String,
    volume: [{
        type: Schema.Types.ObjectId,
        ref: "volume"
    }]
});

module.exports = mongoose.model("category", CategorySchema);