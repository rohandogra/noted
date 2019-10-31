const Category = require("../models/category")

//* list
module.exports.categoryList = (req, res) => {
  Category.find()
    .then(catt => {
      res.json(catt)
    })
    .catch(err => {
      console.log(err)
    })
}
//* Post
module.exports.categoryCreate = (req, res) => {
  const body = req.body
  const category = new Category(body)
  category
    .save()
    .then(category => {
      res.json(category)
    })
    .catch(err => {
      console.log(err)
    })
}
module.exports.categoryShow = (req, res) => {
  const id = req.params.id
  Category.findById(id)
    .then(category => {
      if (category) {
        res.json(category)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}

//* Destroy
module.exports.categoryDestroy = (req, res) => {
  const id = req.params.id
  Category.findByIdAndDelete(id)
    .then(categories => {
      if (categories) {
        res.json(categories)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}
//* Update
module.exports.categoryUpdate = (req, res) => {
  const id = req.params.id
  const body = req.body
  Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then(categories => {
      if (categories) {
        res.json(categories)
      } else {
        res.json({})
      }
    })
    .catch(err => {
      console.log(err)
    })
}
