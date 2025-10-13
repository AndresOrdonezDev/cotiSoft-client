import { Outlet, useLocation } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import ForgotPasswordModal from "../components/admin/modals/ForgotPasswordModal"
export default function AuthLayout() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const modals = {
    showModalForgotPassword:query.has("forgotPassword"),
  };

  return (
    <div>
      <Outlet/>
      {modals.showModalForgotPassword &&  <ForgotPasswordModal/>}
      
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
      />
    </div>
  )
}