require("dotenv/config")
import express from "express"
import connectDB from "./db"
import carRouter from "./router"

const app = express()

app.get("/", (_, res) => {
  res.send("Hello World\n")
})

app.use("/api", carRouter)

const DB_URI = process.env.DB_URI!

connectDB(DB_URI, () => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000")
  })
})
