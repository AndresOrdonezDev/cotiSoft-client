import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
export default function AuthLayout() {
  return (
    <div>
      <Outlet/>
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
      />
    </div>
  )
}