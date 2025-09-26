import { FiSearch, FiPlus } from "react-icons/fi";
import { useClients } from "../../hooks/UseClient";
import { useNavigate } from "react-router-dom";
import departments from '../../data/departments.json'
import cities from '../../data/cities.json'

export default function ClientsView() {
  const { data, isError, isLoading } = useClients();
  const navigate = useNavigate()

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

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al consultar los clientes</p>;

  if (data)
    return (
      <div className="w-full h-screen">
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
          <div className="relative max-w-xl mb-8 ">
            <input
              type="text"
              placeholder="Buscar por nombre, email o identificación..."
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
            />
            <FiSearch
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
          <hr />
        </div>

        
        <div className="grid grid-cols-1 gap-2 lg:gap-1 pb-6 lg:pb-12 mt-6">
          {data.map((client) => (
            <div
              key={client.id}
              className="flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition bg-white"
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
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                  >Editar</button>
                  <button
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-rose-300 border-rose-300"
                  >Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
