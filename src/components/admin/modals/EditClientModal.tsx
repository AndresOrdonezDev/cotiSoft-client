import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NewClientForm from "../forms/ClientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClientById } from "../../../api/ClientAPI";
import { toast } from "react-toastify";
import type { ClientForm } from "../../../types/client";
import { useClientById } from "../../../hooks/UseClient";
import { useEffect} from "react";

export default function EditClientModal() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const productId = query.get("clientId")!
    const { data } = useClientById(+productId)
    
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ClientForm>();

    useEffect(() => {
        if (data) {
            reset({
                fullname: data.fullname || '',
                companyName: data.companyName || '',
                address: data.address || '',
                identificationType: data.identificationType || 0,
                email: data.email || '',
                contact: data.contact || '',
                idNumber: data.idNumber || '',
                department: data.department || "",
                city: data.city || "" 
            })
        }
    }, [productId, data])

    const { mutate } = useMutation({
        mutationFn: updateClientById,
        onError: (data) => toast.error(data.message),
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            queryClient.invalidateQueries({ queryKey: ["clients"] })
            navigate(-1)
        }
    })
    const handleUpdateClient = (formData: ClientForm) => {
        const data = {
            id:+productId,
            formData
        }
        mutate(data)
    };
    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4 flex-shrink-0">Editar Cliente</h2>
                <div className="overflow-y-auto pr-2 flex-1">
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleUpdateClient)}
                        className="space-y-4"
                    >
                        <NewClientForm
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer hover:bg-teal-500 transition-all"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
