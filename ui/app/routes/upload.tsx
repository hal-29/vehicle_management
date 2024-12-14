import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import type { Route } from "./+types/home"
import { useState } from "react"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upload a new vehicle" },
    { name: "description", content: "upload a new vehicle to the application" },
  ]
}

const MAX_FILE_SIZE = 1024 * 1024 * 3
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const formSchema = z.object({
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
  image: z
    .any()
    .refine(
      (files: FileList | null) => !files || files.length <= 10,
      "Maximum of 10 files allowed."
    )
    .refine((files: FileList | null) => {
      if (files === null) return true
      for (const file of files) {
        console.log(file)
        if (file.size > MAX_FILE_SIZE) return false
      }
      return true
    }, `Max image size is 3MB per file.`)
    .refine((files: FileList | null) => {
      if (files === null) return true
      for (const file of files) {
        if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) return false
      }
      return true
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
})

export default function Upload() {
  const [images, setImages] = useState<File[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      brand: "",
      quantity: 1,
      price: 0,
      image: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Upload new vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap mx-auto p-6 border border-dashed w-full max-w-screen-md"
          >
            <div className="flex flex-col gap-4 p-4 grow-0 basis-1/2 shrink-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g, Toyota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g, V8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g, Toyota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g, 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g, 12000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="p-4 grow-0 basis-1/2 shrink-0">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files)
                          setImages([])
                          if (!e.target.files) return
                          for (const file of e.target.files) {
                            setImages((p) => [...p, file])
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-2 p-2">
                {images?.map((img, i) => (
                  <span key={i} className="rounded w-20 h-20 overflow-clip">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover"
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center py-4 basis-full">
              <Button type="submit" className="w-64">
                Upload
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
