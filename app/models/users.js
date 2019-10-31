const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value)
      },
      message: err => {
        console.log("Invalid email format", err)
      }
    },
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 128,
    required: true
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

//* pre hooks

userSchema.pre("save", function(next) {
  const user = this
  if (user.isNew) {
    bcryptjs.genSalt(10).then(salt => {
      bcryptjs.hash(user.password, salt).then(encreptedPassword => {
        user.password = encreptedPassword
        next()
      })
    })
  } else {
    next()
  }
})

//* static methods

userSchema.statics.findByCredencials = function(email, password) {
  const User = this
  return User.findOne({ email })
    .then(function(user) {
      if (!user) {
        return Promise.reject({
          errors: "invalid email/password"
        })
      }
      return bcryptjs.compare(password, user.password).then(result => {
        if (result) {
          return Promise.resolve(user)
        } else {
          return Promise.reject({
            errors: "invalid email/password"
          })
        }
      })
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
userSchema.statics.findByToken = function(token) {
  const User = this
  let tokenData
  try {
    tokenData = jwt.verify(token, "secret123")
  } catch (err) {
    return Promise.reject(err)
  }
  return User.findOne({ _id: tokenData._id, "tokens.token": token })
}
//* instance  method
userSchema.methods.generateToken = function() {
  const user = this
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  }
  const token = jwt.sign(tokenData, "secret123")
  user.tokens.push({ token })
  return user
    .save()
    .then(user => {
      return Promise.resolve({ token })
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

const User = mongoose.model("User", userSchema)

module.exports = { User }
