import { Outlet } from "react-router"
import Navbar from "./navbar"

function Layout() {
  return (
    <main className="relative flex flex-col justify-center gap-3 mx-auto p-6 max-w-screen-2xl h-svh">
      <Navbar />
      {<Outlet />}
    </main>
  )
}
export default Layout
