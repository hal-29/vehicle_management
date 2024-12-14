import express from "express"
import { createCar, getCar } from "./controller"

const carRouter = express.Router()

carRouter.post("/", createCar)
carRouter.get("/", getCar)

export default carRouter
