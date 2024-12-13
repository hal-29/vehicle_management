import express from "express"
import { createCar, getCar } from "./controller"

const carRouter = express.Router()

carRouter.post("/car", createCar)
carRouter.get("/car", getCar)

export default carRouter
