const mongoose = require("mongoose")

const configureDB = () => {
  //* db configuration - establishing connection to db
  mongoose.Promise = global.Promise
  mongoose
    .connect("mongodb://localhost:27017/june-weekday-notesapp", {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Successfully connectred to db")
    })
    .catch(err => {
      console.log("error connecting db", err)
    })
}

module.exports = configureDB
