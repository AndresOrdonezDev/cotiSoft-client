import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
export default function AdminLayout() {
  return (
    <div>
      <Outlet/>
      <ToastContainer
        position="top-center"
        pauseOnHover={false}
      />
    </div>
  )
}