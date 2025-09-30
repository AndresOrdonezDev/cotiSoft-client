import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NewProductForm from "../forms/ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../api/ProductAPI";
import { toast } from "react-toastify";
import type { ProductForm } from "../../../types/product";

export default function NewProductModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onError: (data: any) => toast.error(data.message),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(-1);
    },
  });

  const handleCreateNewProduct = (formData: ProductForm) => {
    mutate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Nuevo Producto</h2>
        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleCreateNewProduct)}
            className="space-y-4"
          >
            <NewProductForm 
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
