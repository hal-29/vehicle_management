import mongoose from "mongoose"

let isConnected = false

const connectDB = async (uri: string, cb?: () => void): Promise<void> => {
  if (isConnected) {
    console.log("Database is already connected.")
    return
  }

  try {
    const connection = await mongoose.connect(uri)

    isConnected = !!connection.connections[0].readyState

    if (isConnected) {
      console.log("Database connection established successfully.")
      cb?.()
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error)
    process.exit(1) // Exit the process if the database connection fails
  }
}

export default connectDB
