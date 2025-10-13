import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { forgotPassword } from "../../../api/AuthAPI";
import type { ForgotPassword } from "../../../types/auth";
export default function ForgotPasswordModal() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPassword>();

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (data: any) => toast.error(data.message),
        onSuccess: (data: any) => {
            toast.success(data.message);
            reset();
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate(-1);
        },
    });

    const handleCreateNewProduct = (formData: ForgotPassword) => {
        mutate(formData);
    };

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-50 p-6 flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Enviar solicitud</h2>
                <p className="font-bold mb-4 flex-shrink-0 text-gray-700">Recibir un correo con las instrucciones</p>
                <div className="overflow-y-auto pr-2 flex-1">
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleCreateNewProduct)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <input 
                                className="border-1 border-teal-700 w-full p-2 rounded-lg"
                                placeholder="Ingrese un correo registrado"
                                type="text"
                                {...register("email",{
                                    required:"Ingrese el correo para recuperación de contraseña"
                                })}
                            />
                            {errors.email && <p className="text-red-500 bg-red-100 text-sm text-center p-2 rounded-lg">{errors.email.message}</p>}
                        </div>

                        <div className="flex justify-end gap-2 mt-10">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-600 text-white rounded"
                            >
                               Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}