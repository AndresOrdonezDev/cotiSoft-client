import { FiSearch, FiPlus, FiXCircle } from "react-icons/fi";
import { useClients } from "../../hooks/UseClient";
import { useNavigate } from "react-router-dom";
import departments from '../../data/departments.json'
import cities from '../../data/cities.json'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleClientActive } from "../../api/ClientAPI";
import { toast } from "react-toastify";

export default function ClientsView() {
  const [showActives, setShowActives] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const { data, isError, isLoading } = useClients(showActives, search);
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const showDepartment = (code: string) => {
    if (!code) return "";
    const department = departments.find((d) => d.code === code);
    return department ? department.department : "N/A";
  };
  const showCity = (codeDepartment: string, codeCity: string) => {
    if (!codeDepartment && !codeCity) return "";
    const city = cities.find((d) => d.department === codeDepartment && d.code === codeCity);
    return city ? city.city : "N/A";
  };
  const { mutate } = useMutation({
    mutationFn: toggleClientActive,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["clients", showActives] })
    }
  })


  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al consultar los clientes</p>;
  if (data)
    return (
      <div className="w-full h-screen lg:px-12">
        <div className="sticky top-0 bg-gray-100 pt-6 lg:pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-slate-700">Clientes</h1>

            <button
              onClick={() => navigate('?newClient=true')}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
              <FiPlus size={18} />
              Nuevo Cliente
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-center mb-8">
            <div className="relative w-full lg:w-xl">
              <input
                type="text"
                placeholder="Buscar por nombre, empresa, identificación o email.."
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
          {data.map((client) => (
            <div
              key={client.id}
              className={`flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition ${client.isActive ? 'bg-white' : 'bg-red-50'}`}
            >

              <div>
                <p className="font-medium text-slate-700">{client.fullname && client.fullname.toUpperCase()}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
                {client.companyName && (
                  <p className="text-sm text-gray-500">{client.companyName}</p>
                )}
              </div>


              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <span>ID: {client.idNumber}</span>
                <span>{client.contact}</span>
                <span>
                  {client.city && showCity(client.department, client.city)}, {client.department && showDepartment(client.department)}
                </span>
                <div className="space-x-3">
                  <button
                    onClick={() => navigate(`?editClient=true&clientId=${client.id}`)}
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                  >Editar</button>
                  <button
                    onClick={() => mutate(client.id)}
                    className={`border rounded-lg px-2 cursor-pointer text-gray-950 
                      ${client.isActive ? 'bg-rose-300 border-rose-300' : 'bg-teal-300 border-teal-300'}`}
                  >{client.isActive ? 'Inactivar' : 'Activar'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
