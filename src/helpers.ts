import { promises as fs } from "fs"
import path from "path"
import { Multer } from "multer"

interface WriteFileOptions {
  fileName: string
  file: Express.Multer.File
  filepath: string
}

/**
 * Writes a Multer file to disk at the specified filepath.
 * @param options - An object containing the Multer file and filepath.
 * @returns A Promise that resolves when the file is written or rejects if an error occurs.
 */
export const writeFileToDisk = async (
  options: WriteFileOptions
): Promise<string> => {
  const { file, filepath, fileName } = options

  try {
    const fullPath = path.join(filepath, fileName)

    await fs.mkdir(filepath, { recursive: true })

    await fs.writeFile(fullPath, file.buffer)

    return fileName
  } catch (error) {
    console.error("Error writing file to disk:", error)
    throw error
  }
}

interface DeleteFileOptions {
  filename: string
  filepath: string
}

/**
 * Deletes a file from disk at the specified filepath.
 * @param options - An object containing the filename and filepath.
 * @returns A Promise that resolves when the file is deleted or rejects if an error occurs.
 */
export const deleteFileFromDisk = async (
  options: DeleteFileOptions
): Promise<string> => {
  const { filename, filepath } = options

  try {
    const fullPath = path.join(filepath, filename)

    await fs.access(fullPath)

    await fs.unlink(fullPath)

    return filename
  } catch (error) {
    console.error("Error deleting file from disk:", error)
    throw error
  }
}
