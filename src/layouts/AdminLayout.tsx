import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
export default function AdminLayout() {
  return (
    <div>
      <Outlet/>
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
      />
    </div>
  )
}