const { Schema, default: mongoose } = require("mongoose");

const FeedSchema = new Schema({
    title: { type: String, unique: true, required: [true, "Title is required"] },
    body: { type: String, },
    image: { type: String },
    source: { type: String, required: [true, "Source is required"] },
    publisher: { type: String },
});

module.exports = mongoose.model( 'Feed', FeedSchema, 'Feeds' );