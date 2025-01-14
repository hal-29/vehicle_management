import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vehicle Control Panel" },
    { name: "description", content: "Welcome to vehicle admin dashboard!" },
  ]
}

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Vehicles list</CardTitle>
        <CardDescription className="text-center">
          A list of all vehicles with their status and models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="gap-4 grid md:grid-cols-3 auto-rows-min">
            <div className="bg-muted/50 rounded-xl aspect-video" />
            <div className="bg-muted/50 rounded-xl aspect-video" />
            <div className="bg-muted/50 rounded-xl aspect-video" />
          </div>

          <div className="flex-1 bg-muted/50 rounded-xl min-h-[100vh] md:min-h-min" />
        </div>
      </CardContent>
    </Card>
  )
}
