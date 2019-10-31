const Note = require("../models/note")

//* list
module.exports.list = (req, res) => {
  Note.find({ userId: req.user._id }).then(notes => {
    res.json(notes)
  })
}

//* Post

module.exports.create = (req, res) => {
  const body = req.body
  const note = new Note(body)
  note
    .save()
    .then(note => {
      res.json(note)
    })
    .catch(err => {
      res.json(err)
    })
}
//* show
module.exports.show = (req, res) => {
  const id = req.params.id
  Note.findOne({ userId: req.user._id, _id: id })
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}

//* destroy
module.exports.destroy = (req, res) => {
  const id = req.params.id
  Note.findByIdAndDelete({ userId: req.user._id, _id: id })
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}

//* update
module.exports.update = (req, res) => {
  const id = req.params.id
  const body = req.body
  Note.findByIdAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true
  })
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}
