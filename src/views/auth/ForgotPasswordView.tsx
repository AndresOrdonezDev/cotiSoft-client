import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";

type FormForgotPassword = {
  password: string;
  confirmPassword: string;
};

export default function ForgotPasswordView() {
  const params = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormForgotPassword>();

  const {mutate} = useMutation({
    mutationFn:updatePasswordToken,
    onError:(data)=> toast.error(data.message),
    onSuccess:(data)=>{
      toast.success(data.message),
      navigate('/login')
    }
  })
  const handleUpdatePasswordToken = (formData: FormForgotPassword) => {
    const data = {
      email:params.email!,
      password:formData.password!,
      token:params.token!
    }
    mutate(data)
  };

  const password = watch("password");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-md bg-white/95 shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-700">
            Restablecer Contraseña
          </h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Ingresa tu nueva contraseña para actualizar tu acceso
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleUpdatePasswordToken)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nueva contraseña
            </label>
            <input
              className="border-2 border-teal-600 w-full p-2 rounded-lg"
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Ingrese la nueva contraseña",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirmar contraseña
            </label>
            <input
              className="border-2 border-teal-600 w-full p-2 rounded-lg"
              type="password"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Confirme la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <input
            className="cursor-pointer w-full p-2 rounded-lg bg-teal-600 text-white uppercase font-semibold hover:bg-teal-700 transition-all"
            type="submit"
            value={"Actualizar contraseña"}
          />

          <div className="text-center text-sm text-gray-500 mt-3">
            ¿Recordaste tu contraseña?{" "}
            <button
              onClick={() => (window.location.href = "/login")}
              type="button"
              className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
            >
              Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
