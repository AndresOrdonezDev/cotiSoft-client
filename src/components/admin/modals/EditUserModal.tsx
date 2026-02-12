import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { UpdateUser } from "../../../types/auth";
import { getUserById, updateUser } from "../../../api/AuthAPI";

export default function EditUserModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const userId = query.get("userId")!;

  // Obtener usuario
  const { data: user, isLoading } = useQuery({
    queryKey: ["userUpdate", userId],
    queryFn: () => getUserById(+userId),
    enabled: !!userId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUser>({
    defaultValues: {
      email: "",
      username: "",
      isAdmin: false,
    },
  });

  // ✅ Solo actualiza el formulario cuando llegan los datos del usuario
  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      });
    }
  }, [user, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["usersAuth"] });
      navigate(-1);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleUpdateUser = (formData: UpdateUser) => {
    mutate({ id: Number(userId), formData });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-10">
        <div className="text-white text-lg font-semibold">Cargando usuario...</div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">
          Editar Usuario
        </h2>

        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleUpdateUser)}
            className="space-y-4"
          >
            {/* Campo: Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="border-2 border-teal-600 w-full p-2 rounded-lg"
                placeholder="Nombre de usuario"
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                })}
              />
              {errors.username && (
                <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Campo: Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                className="border-2 border-teal-600 w-full p-2 rounded-lg"
                placeholder="usuario@correo.com"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                })}
              />

              {errors.email && (
                <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {/* Campo: isAdmin */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAdmin"
                className="w-4 h-4 accent-teal-600"
                {...register("isAdmin")}
              />
              <label htmlFor="isAdmin" className="text-sm text-gray-700">
                Es administrador
              </label>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={`px-4 py-2 rounded text-white transition ${
                  isPending
                    ? "bg-teal-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
