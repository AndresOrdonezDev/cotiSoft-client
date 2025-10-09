import { Outlet, useNavigate } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import { useAuth } from "../hooks/UseAuth"
import Spinner from "../components/shared/Spinner"


export default function AdminLayout() {
  const navigate = useNavigate()
  const {userAuthenticated, isLoading, isError} = useAuth()
   if(isLoading) return <div className="flex items-center justify-center mt-50"><Spinner/></div>
   if(isError) return (<>{navigate('/login')}</>)
   if(userAuthenticated)return (
    <div>
      <Outlet/>
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
      />
    </div>
  )
}