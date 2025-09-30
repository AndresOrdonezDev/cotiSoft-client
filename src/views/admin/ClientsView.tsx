import { FiPlus } from "react-icons/fi";
import { useClients } from "../../hooks/UseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClientSearchBar from "../../components/admin/searchBars/ClientSearchBar";
import ClientCard from "../../components/admin/cards/ClientCard";

export default function ClientsView() {
  const [showActives, setShowActives] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const { data, isError, isLoading } = useClients(showActives, search);
  const navigate = useNavigate()

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
          <ClientSearchBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            setSearch={setSearch}
            search={search}
            setShowActives={setShowActives}
            showActives={showActives}
          />
          <hr />
        </div>
        <div className="grid grid-cols-1 gap-2 lg:gap-1 pb-6 lg:pb-12 mt-6">
          {data.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              showActives={showActives}
            />
          ))}
        </div>
      </div>
    );
}
