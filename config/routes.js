const express = require("express")
const router = express.Router()

const noteController = require("../app/controllers/notesController")
const categoryController = require("../app/controllers/categoriesController")
const userController = require("../app/controllers/userController")
const {
  authenticateUser
} = require("../app/controllers/middleware/authenticate")

//* Notes Route
router.get("/notes", authenticateUser, noteController.list)
router.get("/notes/:id", authenticateUser, noteController.show)
router.post("/notes", authenticateUser, noteController.create)
router.delete("/notes/:id", authenticateUser, noteController.destroy)
router.put("/notes/:id", authenticateUser, noteController.update)

//* Category Route
router.get("/categorys", categoryController.categoryList)
router.get("/categorys/:id", categoryController.categoryShow)
router.post("/categorys", categoryController.categoryCreate)
router.delete("/categorys/:id", categoryController.categoryDestroy)
router.put("/categorys/:id", categoryController.categoryUpdate)

//* register Route
router.post("/register", userController.register)
router.get("/account", authenticateUser, userController.account)
router.post("/login", userController.login)
router.delete("/logout", authenticateUser, userController.logout)

module.exports = router
