import { Outlet } from "react-router"
import Sidebar from "./components/Sidebar/Sidebar"


const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex ">
        <aside><Sidebar /></aside>
        <main className="bg-[#f1f1f1e7] w-full overflow-auto px-8 py-4"><Outlet/></main>
    </div>
  )
}

export default DashboardLayout