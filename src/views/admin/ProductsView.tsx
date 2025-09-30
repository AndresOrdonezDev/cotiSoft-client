import { FiSearch, FiPlus, FiXCircle } from "react-icons/fi";
import { useProducts } from "../../hooks/UseProduct";
import { formatCurrency } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ProductsView() {
  const [showActives, setShowActives] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const { data, isError, isLoading } = useProducts();
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al consultar los productos</p>;

  if (data)
    return (
      <div className="w-full h-screen lg:px-12">
        <div className="sticky top-0 bg-gray-100 pt-6 lg:pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-slate-700">Productos</h1>

            <button
              onClick={() => navigate('?newProduct=true')}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
              <FiPlus size={18} />
              Nuevo Producto
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-center mb-8">
            <div className="relative w-full lg:w-xl">
              <input
                type="text"
                placeholder="Buscar nombre o descripción"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-gray-700 
                           focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
              />
              {!search && <FiSearch
                onClick={() => setSearch(searchInput)}
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              />}
              {search && <FiXCircle
                onClick={() => [setSearch(""), setSearchInput("")]}
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              />}
            </div>
            <div
              onClick={() => setShowActives(showActives === 1 ? 0 : 1)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <span className="text-sm font-medium text-gray-700">
                {showActives === 1 ? "Activos" : "Inactivos"}
              </span>
              <div
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300
                          ${showActives === 1 ? "bg-teal-600" : "bg-gray-600"}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
                            ${showActives === 1 ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="grid grid-cols-1 gap-2 lg:gap-1 pb-6 lg:pb-12 mt-6">
          {data.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition ${product.isActive ? 'bg-white' : 'bg-red-50'}`}
            >

              <div>
                <p className="font-medium text-slate-700">{product.name}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <span>{formatCurrency(product.price)}</span>
                <span>Stock: {product.stock}</span>
                <span>IVA: {product.tax}%</span>
                <div className="space-x-3">
                  <button
                    onClick={()=>navigate(`?editProduct=true&productId=${product.id}`)}
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                  >Editar</button>
                  <button

                    className={`border rounded-lg px-2 cursor-pointer text-gray-950 
                      ${product.isActive ? 'bg-rose-300 border-rose-300' : 'bg-teal-300 border-teal-300'}`}
                  >{product.isActive ? 'Inactivar' : 'Activar'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
