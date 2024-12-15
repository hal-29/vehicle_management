import { z } from "zod"

export interface ICar {
  name: string
  id: string
  model: string
  quantity: number
  brand: string
  price: number
  images: string[]
}

export const carSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  model: z
    .string()
    .min(2, { message: "Model must be at least 2 characters long" })
    .max(50, { message: "Model must be at most 50 characters long" }),
  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters long" })
    .max(50, { message: "Brand must be at most 50 characters long" }),
  quantity: z.preprocess(
    (v) => (isFinite(Number(v)) ? Number(v) : ""),
    z.number().positive({ message: "Quantity must be a positive number" })
  ),
  price: z.preprocess(
    (v) => (isFinite(Number(v)) ? Number(v) : ""),
    z.number({ message: "Price must be a number" })
  ),
})
