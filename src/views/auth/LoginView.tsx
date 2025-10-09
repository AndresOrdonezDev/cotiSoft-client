import Logo from "../../components/shared/Logo";
import type { UserLogin } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginView() {
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm<UserLogin>()
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (data) => { toast.error(data.message) },
    onSuccess: (data) => {
      navigate("/quotes")
      localStorage.setItem('token-cotisoft', data)
    }
  })
  const handleLogin = (formData: UserLogin) => {
    mutate(formData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-md bg-white/95 shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-700">
            Iniciar sesión
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Accede con tus credenciales para continuar
          </p>
        </div>

        <form 
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo
            </label>
            <input
              className="border-2 border-teal-600 w-full p-2 rounded-lg"
              type="email"
              placeholder="usuario@correo.com"
              required
              {...register("email",{
                required:"Ingrese el Correo"
              })}
            />
            {errors.email && <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">{errors.email.message }</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              className="border-2 border-teal-600 w-full p-2 rounded-lg"
              type="password"
              placeholder="********"
              required
              {...register("password",{
                required:"Ingrese la contraseña"
              })}
            />
            {errors.password && <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">{errors.password.message }</p>}
          </div>

          <input
            className="cursor-pointer w-full p-2 rounded-lg bg-teal-600 text-white uppercase font-semibold hover:bg-teal-700 transition-all"
            type="submit"
            value={"Ingresar"}
          />

          <div className="text-center text-sm text-gray-500 mt-3">
            ¿Olvidaste tu contraseña?{" "}
            <a
              href="#"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Recuperar acceso
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

