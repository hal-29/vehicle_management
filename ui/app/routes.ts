import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes"

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("vehicles", "routes/vehicles.tsx"),
    route("upload", "routes/upload.tsx"),
    ...prefix("edit", [
      index("routes/edit.tsx"),
      route(":vehicleId", "routes/edit-form.tsx"),
    ]),
  ]),
] satisfies RouteConfig
