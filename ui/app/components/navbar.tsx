import { PlusCircle } from "lucide-react"
import { Link, NavLink } from "react-router"
import { Button } from "./ui/button"

function Navbar() {
  const setClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "inline-flex transition-all text-sm justify-center items-center bg-slate-600 hover:bg-slate-700 px-4 rounded-full h-8 text-accent text-white capitalize"
      : "inline-flex transition-all text-sm justify-center items-center bg-slate-100 hover:bg-slate-200 px-4 rounded-full h-8 text-accent-foreground capitalize"
  }

  return (
    <nav className="bg-white p-2 rounded-lg">
      <ul className="flex items-center gap-4 h-10">
        <li>
          <NavLink to="/" className={setClassName}>
            dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/vehicles" className={setClassName}>
            vehicles
          </NavLink>
        </li>
        <Link className="ml-auto" to="/upload">
          <Button className="rounded-full h-8 text-sm">
            <span>Upload</span>
            <span>
              <PlusCircle size={24} />
            </span>
          </Button>
        </Link>
      </ul>
    </nav>
  )
}
export default Navbar
