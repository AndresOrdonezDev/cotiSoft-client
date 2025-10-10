import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/AuthAPI";
import Spinner from "../../components/shared/Spinner";

export default function AuthView() {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['usersAuth'],
        queryFn: getUsers
    })
    if (isLoading) return <div className="flex items-center justify-center"><Spinner /></div>;
    if (isError) return <p>Error al consultar los clientes</p>;
    if (data) return (
        <div className="w-full h-screen lg:px-12">
            <div className="sticky top-0 bg-gray-100 pt-6 lg:pt-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-slate-700">Usuarios</h1>
                    <button
                        onClick={()=>navigate('?modalNewUser=true')}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        <FiPlus size={18} />
                        Nuevo Usuario
                    </button>
                </div>
                <hr />
            </div>
            <div className="grid grid-cols-1 gap-2 lg:gap-1 pb-6 lg:pb-12 mt-6">
                {data.map((user) => (
                    <div
                        key={user.id}
                        className={`flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
                                    sm:justify-between px-5 py-4 hover:bg-teal-50 transition ${user.isActive ? 'bg-white' : 'bg-red-50'}`}
                    >
                        <div>
                            <p className="font-medium text-slate-700 uppercase">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">

                            <span>{user.isAdmin ? "Admin" : "Aux"}</span>
                            <div className="space-x-3">
                                <button
                                    onClick={() => navigate(`?edituser=true&userId=${user.id}`)}
                                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                                >Editar</button>
                                <button

                                    className={`border rounded-lg px-2 cursor-pointer text-gray-950 
                                        ${!user.isActive ? 'bg-rose-300 border-rose-300' : 'bg-teal-300 border-teal-300'}`}
                                >{user.isActive ? 'Activo' : 'Inactivo'}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}