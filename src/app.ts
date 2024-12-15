require("dotenv/config")
require("express-async-errors")
import express from "express"
import connectDB from "./db"
import carRouter from "./router"
import { handleErrors } from "./middleware"

const app = express()

app.use("/api/car", carRouter)

app.use(handleErrors)

const DB_URI = process.env.DB_URI!

export const serve = () => {
  connectDB(DB_URI, () => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000")
    })
  })
}
