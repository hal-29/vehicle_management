import { Request, Response } from "express"

export async function createCar(req: Request, res: Response) {
  res.json({ message: "new car created" })
}

export async function getCar(req: Request, res: Response) {
  res.json("car")
}
