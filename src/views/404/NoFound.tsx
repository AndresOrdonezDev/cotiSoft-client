//import Logo from "@/components/shared/Logo";
import { Link } from "react-router-dom";

export default function NoFound() {
  return (
    <div className="flex flex-col mt-50 justify-center items-center">
      {/* <Logo /> */}
      <p className="font-semibold mt-10 text-2xl">No se encontró la página</p>
      <h1 className="text-8xl text-gray-950 mt-10 text-center font-black">404</h1>
      <p className="text-gray-800 text-center mt-10 text-2xl">Tal vez quieras ir a <Link to={'/'} className="bg-gray-800 rounded-lg text-white px-2">mis cotizaciones</Link></p>
    </div>
  )
}