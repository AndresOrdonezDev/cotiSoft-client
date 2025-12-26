import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaRegAddressCard } from "react-icons/fa6";
import type { Client } from "../../../types/client";
import departments from '../../../data/departments.json'
import cities from '../../../data/cities.json'
import { toggleClientActive } from "../../../api/ClientAPI";

type ClientCardProps = {
  client: Client,
  showActives: number
}

export default function ClientCard({ client, showActives }: ClientCardProps) {
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
  return (
    <div
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
        <div className="space-x-3 items-center flex">
          <button
            onClick={() => navigate(`?editClient=true&clientId=${client.id}`)}
            className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
          >Editar</button>
          <button
            onClick={() => mutate(client.id)}
            className={`border rounded-lg px-2 cursor-pointer text-gray-950 
                      ${client.isActive ? 'bg-rose-300 border-rose-300' : 'bg-teal-300 border-teal-300'}`}
          >{client.isActive ? 'Inactivar' : 'Activar'}</button>
          
          <button 
            className="text-gray-600 p-1 cursor-pointer"
            onClick={() => navigate(`?addEmail=true&clientEmailId=${client.id}`)}>
            <FaRegAddressCard size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}