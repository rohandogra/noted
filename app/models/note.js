const mongoose = require("mongoose")

const Schema = mongoose.Schema
const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  userId: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  }
})
//* Note constructor function
const Note = mongoose.model("Note", noteSchema)

module.exports = Note
