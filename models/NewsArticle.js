var mongoose = require("mongoose");

// === Saving a reference to the schema constructor ===
var Schema = mongoose.Schema;

// === Creating a new UserSchema object by using the Schema constructor ===
// === Need: title, type of string; link, type of string; notes, an object that stores a notes id ===
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

// === Creating out model from the above schema (mongoose's model method) ===
var NewsArticle = mongoose.model("NewsArticle", ArticleSchema);

// === Export the NewsArticle model ===
module.exports = NewsArticle;