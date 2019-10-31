const mongoose = require("mongoose")
const Schema = mongoose.Schema

//* Schema for o ur note - constructor function - helps us define the shape of a document inside a collection

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
