import { useState } from "react"
import { FiSearch, FiXCircle } from "react-icons/fi";

export default function CreateQuoteView() {
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-6xl mx-auto py-12 text-gray-700 ">
      <h1 className="text-2xl font-bold text-center">Nueva Cotización</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
        <div>
          <h2 className="font-bold text-xl p-5">Buscar Cliente</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por nombre, empresa, identificación o email.."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 
                             focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
            />
            {!search && <FiSearch
              onClick={() => setSearch(searchInput)}
              size={20}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />}
            {search && <FiXCircle
              onClick={() => [setSearch(""), setSearchInput("")]}
              size={20}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />}
          </div>
          <div className="space-y-1 bg-white mt-10 p-5 rounded-lg">
            <h4 className="font-bold">Nombre cliente</h4>
            <p>Razón social cliente</p>
            <p>email principal para envío de Cotización</p>
            <p className="font-bold">Contacto: 3144642114</p>
          </div>
          <h2 className="font-bold text-xl p-5">Buscar Producto</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por nombre, empresa, identificación o email.."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 
                             focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
            />
            {!search && <FiSearch
              onClick={() => setSearch(searchInput)}
              size={20}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />}
            {search && <FiXCircle
              onClick={() => [setSearch(""), setSearchInput("")]}
              size={20}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />}
          </div>
          <div className="space-y-1 bg-white mt-10 p-5 rounded-lg">
            <h4 className="font-bold">Nombre cliente</h4>
            <p>Razón social cliente</p>
            <p>email principal para envío de Cotización</p>
            
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="font-bold text-xl p-5">Productos Agregados:</h2>
        </div>
      </div>
    </div>
  )
}