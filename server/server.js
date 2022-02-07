import { readdirSync } from "fs"
import express from "express"
import cors from "cors"
const morgan = require("morgan")
require("dotenv").config()
import mongoose from "mongoose"
const colors = require("colors")

// create express app
const app = express()

//db connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected".cyan.underline))
  .catch((err) => console.log(`DB connection error: ${err}`.red))

// apply middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// route
readdirSync("./routes").map((r) => app.use("/api/v1", require(`./routes/${r}`)))

// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`.yellow))
