import { NextFunction, Request, Response } from "express"
import { randomBytes } from "node:crypto"
import { deleteFileFromDisk, writeFileToDisk } from "./helpers"
import Car from "./model"
import { carSchema } from "./schemas"

export async function createCar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validData = carSchema.safeParse(req.body)
  const files = req.files

  if (!validData.success) {
    return res.status(400).json(validData.error.flatten().fieldErrors) as any
  }

  let uploadedFiles: string[] = []

  try {
    if (Array.isArray(files)) {
      uploadedFiles = await Promise.all(
        files.map((file) =>
          writeFileToDisk({
            file,
            fileName: randomBytes(8).toString("hex") + file.originalname,
            filepath: "./uploads",
          })
        )
      )
    }

    const car = (
      await new Car(
        Object.assign({ images: uploadedFiles }, validData.data)
      ).save()
    ).toObject()

    return res.status(201).json(car)
  } catch (error) {
    if (uploadedFiles.length)
      await Promise.all(
        uploadedFiles.map((filename) =>
          deleteFileFromDisk({ filename, filepath: "./uploads" })
        )
      )

    console.log(error)
    return next(new Error("Error submitting form."))
  }
}

export async function getCar(req: Request, res: Response, next: NextFunction) {
  const cars = await Car.find()

  return res.status(200).json(cars) as any
}
