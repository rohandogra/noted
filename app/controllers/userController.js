const { User } = require("../models/users")
const _ = require("lodash")

module.exports.register = (req, res) => {
  const body = req.body
  const user = new User(body)
  user
    .save()
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports.listUser = (req, res) => {
  User.find()
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log(err))
}
//* localhost:3030/users/account
module.exports.account = function(req, res) {
  // const { user } = req
  res.send(_.pick(req.user, ["_id", "username", "email"]))
}

module.exports.login = (req, res) => {
  const body = req.body
  let user
  User.findByCredencials(body.email, body.password)
    .then(userFound => {
      user = userFound
      return user.generateToken()
    })
    .then(token => {
      user = _.pick(user, ["_id", "username", "email"])
      res.json({ token, user })
    })
    .catch(err => {
      res.json(err)
    })
}

//* logout

module.exports.logout = (req, res) => {
  const { user, token } = req
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.send({ notic: "successfully loggged out" })
    })
    .catch(err => {
      res.send(err)
    })
}
