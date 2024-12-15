import {
  Errback,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import multer from "multer"

const MAX_FILE_SIZE = 1024 * 1024 * 3
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

interface UploaderProps {
  name: string
  type: "single" | "array"
  size?: number
  mimetype?: string[]
  fileSize?: number
}

export function uploadFiles({
  name,
  type = "array",
  size = 10,
  mimetype = ACCEPTED_IMAGE_MIME_TYPES,
  fileSize = MAX_FILE_SIZE,
}: UploaderProps) {
  return (req: Request, res: Response, next: NextFunction) =>
    multer()[type](name, size)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return next(new Error("Unable to upload files"))
      }

      const files = req.files

      if (Array.isArray(files)) {
        for (const file of files) {
          if (file.size > fileSize || !mimetype.includes(file.mimetype)) {
            return next(
              new Error("File size or type is not allowed", {
                cause: "File Upload",
              })
            )
          }
        }
      } else {
        for (const key in files) {
          if (files.hasOwnProperty(key)) {
            for (const file of files[key]) {
              if (file.size > fileSize || !mimetype.includes(file.mimetype)) {
                return next(
                  Error("File size or type is not allowed", {
                    cause: "File Upload",
                  })
                )
              }
            }
          }
        }
      }

      return next()
    })
}

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400).json({ error: err.message || "Server failed" })
}
