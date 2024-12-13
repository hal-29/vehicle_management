import mongoose, { Schema, Model } from "mongoose"

interface ICar {
  name: string
  id: string
  model: string
  status: "available" | "unavailable"
  brand: string
  price: number
}

const CarSchema: Schema<ICar> = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  status: { type: String, enum: ["available", "unavailable"], required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
})

let Car: Model<ICar>
if (!mongoose.models.Car) {
  Car = mongoose.model<ICar>("Car", CarSchema)
} else {
  Car = mongoose.models.Car as Model<ICar>
}

export default Car
