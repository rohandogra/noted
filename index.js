const express = require("express")
const router = require("./config/routes")
const configureDB = require("./config/database")
const app = express()
const port = 3030
const cors = require("cors")
configureDB()

app.use(cors())
app.use(express.json())

app.use("/users", router)

app.listen(port, () => {
  console.log("listing node server on port", port)
})
