import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { FormNewUser } from "../../../types/auth";
import UserRegisterForm from "../forms/UserForm";
import { createAccount } from "../../../api/AuthAPI";
import { toast } from "react-toastify";
;

export default function NewUserModal() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormNewUser>();
    const {mutate} = useMutation({
      mutationFn:createAccount,
      onError:(data)=>toast.error(data.message),
      onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['usersAuth']})
        navigate(-1)
        toast.success(data.message)
      }
    })
    const handleCreateNewUser = (formData:FormNewUser)=>{
       mutate(formData)
    }
    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Nuevo Usuario</h2>
                <div className="overflow-y-auto pr-2 flex-1">
                  <form
                    noValidate
                    onSubmit={handleSubmit(handleCreateNewUser)}
                    className="space-y-4"
                  >
                    <UserRegisterForm 
                      register={register}
                      watch={watch}
                      errors={errors}
                    />
                    <div className="flex justify-end gap-2">
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
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    )
}