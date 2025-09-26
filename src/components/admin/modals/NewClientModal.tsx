import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NewClientForm from "../forms/NewClientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../../../api/ClientAPI";
import { toast } from "react-toastify";
import type { ClientForm } from "../../../types/client";

export default function NewClientModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientForm>();

  const { mutate } = useMutation({
    mutationFn: createClient,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries({queryKey:["clients"]})
      navigate(-1)
    }
  })
  const handleCreateNewClient = (formData: ClientForm) => {
    mutate(formData)
  };
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0">Nuevo Cliente</h2>
        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleCreateNewClient)}
            className="space-y-4"
          >
            <NewClientForm 
              register={register}
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
  );
}
