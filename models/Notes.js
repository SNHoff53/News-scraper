var mongoose = require("mongoose");

// === Saving a reference to the Schema constructor
var Schema = mongoose.Schema;

// === Using the Schema constructor, we create a new NotesSchema ===
var NotesSchema = new Schema ({
    title: String,
    body: String
});

// === Creating out model from the above schema (mongoose's model method) ===
var Notes = mongoose.model("Notes", NotesSchema);

// === Export the Notes model ===
module.exports = Notes;