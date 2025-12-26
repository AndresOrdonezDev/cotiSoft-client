import { useLocation, useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEmailToList, deleteEmailFromList, getClientEmails } from "../../../api/ClientAPI";
import { useForm } from "react-hook-form";
import type { EmailClientList } from "../../../types/client";
import Spinner from "../../shared/Spinner";

export default function AddEmailModal() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get("clientEmailId")!

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EmailClientList>();

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["clientEmails", id],
        queryFn: () => getClientEmails(+id)
    })

    const addEmailMutation = useMutation({
        mutationFn: addEmailToList,
        onError: (data) => toast.error(data.message),
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            queryClient.invalidateQueries({ queryKey: ["clientEmails", id] })
        }
    })

    const handleAddEmail = (formData: EmailClientList) => {
    
        const data: EmailClientList = {
            id:+id,
            email: formData.email
        }
        addEmailMutation.mutate(data)
    };
    const deleteEmailMutation = useMutation({
        mutationFn:deleteEmailFromList,
        onError: (data) => toast.error(data.message),
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            queryClient.invalidateQueries({ queryKey: ["clientEmails", id] })
        }
    })

    const handleDeleteEmail = (idEmail:number)=>{
        deleteEmailMutation.mutate(idEmail)
    }
    if(isError) return <p>Error</p>
    if(isLoading) return <Spinner/>
    if (data)return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">

                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-700">
                        Agregar Correos Electrónicos
                    </h2>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1 rounded-full transition-colors"
                        title="Cerrar"
                    >
                        <IoClose size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                 
                    <form
                        onSubmit={handleSubmit(handleAddEmail)}
                        className="mb-6"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="ejemplo@correo.com"
                                className="flex-1 px-2 py-2 ml-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                                {...register("email", {
                                    required: "Debe ingresar un correo"
                                })}
                            />
                            
                            <button
                                type="submit"
                                className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                title="Agregar correo"
                            >
                                <FiPlusCircle size={24} />
                            </button>
                        </div>
                        {errors.email && (
                                <p className="text-center mt-1 text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                    </form>

                    
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Correos Agregados ({data.length})
                        </h3>
                        {data.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <MdEmail size={48} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No hay correos agregados</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {data.map((list, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                                    >
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <MdEmail className="text-teal-600 flex-shrink-0" size={20} />
                                            <span className="text-sm text-gray-700 truncate">
                                                {list.email}
                                            </span>
                                        </div>
                                        <button
                                            onClick={()=>handleDeleteEmail(list.id)}
                                            type="button"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors flex-shrink-0"
                                            title="Eliminar correo"
                                        >
                                            <IoClose size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}