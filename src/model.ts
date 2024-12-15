import mongoose, { Schema, Model, Mongoose } from "mongoose"

interface ICar {
  name: string
  id: string
  model: string
  quantity: number
  brand: string
  price: number
  images: string[]
}

const CarSchema: Schema<ICar> = new Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String] },
  },
  {
    versionKey: false,
  }
)

let Car: Model<ICar>
if (!mongoose.models.Car) {
  Car = mongoose.model<ICar>("Car", CarSchema)
} else {
  Car = mongoose.models.Car as Model<ICar>
}

export default Car
