import express from "express"
import { createCar, getCar } from "./controller"
import { uploadFiles } from "./middleware"

const carRouter = express.Router()

carRouter.post(
  "/",
  uploadFiles({ name: "images", type: "array", fileSize: 1024 * 1024 * 3 }),
  createCar
)
carRouter.get("/", getCar)

export default carRouter
