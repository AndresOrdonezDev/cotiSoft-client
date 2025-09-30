import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditProductForm from "../forms/ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../../api/ProductAPI";
import { toast } from "react-toastify";
import type { ProductForm } from "../../../types/product";
import { useProductById } from "../../../hooks/UseProduct";
import { useEffect } from "react";

export default function EditProductModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const productId = query.get("productId")!;
  const { data } = useProductById(+productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        stock: data.stock || 0,
        tax: data.tax || 0,
        productType: data.productType || 0,
      });
    }
  }, [productId, data, reset]);

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(-1);
    },
  });

  const handleUpdateProduct = (formData: ProductForm) => {
    const data = {
      id: +productId,
      formData,
    };
    mutate(data);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Editar Producto</h2>
        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleUpdateProduct)}
            className="space-y-4"
          >
            <EditProductForm
              register={register}
              errors={errors}
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
