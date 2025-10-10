import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import type { FormNewUser } from "../../../types/auth";

type NewUserFormProps = {
    register: UseFormRegister<FormNewUser>;
    errors: FieldErrors<FormNewUser>;
    watch: UseFormWatch<FormNewUser>;
};

export default function UserRegisterForm({ register, watch, errors }: NewUserFormProps) {
    const password = watch("password", "");
    return (
        <>
            {/* Name */}
            <div>
                <input
                    type="text"
                    placeholder="Nombre del usuario"
                    className="w-full border rounded px-3 py-2"
                    {...register("username", {
                        required: "Ingrese el nombre del usuario",
                    })}
                />
                {errors.username && (
                    <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                        {errors.username.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full border rounded px-3 py-2"
                    {...register("email", {
                        required: "Ingrese el email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingrese un correo electrónico válido",
                        },
                    })}
                />
                {errors.email && (
                    <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border rounded px-3 py-2"
                    {...register("password", {
                        required: "Defina una contraseña",
                    })}
                />
                {errors.password && (
                    <p className="bg-red-200 rounded-lg text-center mt-3 font-semibold text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="w-full border rounded px-3 py-2"
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

            {/* Toggle isAdmin */}
            <div className="flex items-center justify-between mt-4">
                <label htmlFor="isAdmin" className="font-medium text-gray-700">
                    Administrador?
                </label>
                <label htmlFor="isAdmin" className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="isAdmin"
                        className="sr-only peer"
                        {...register("isAdmin")}
                    />
                    <div
                        className="w-11 h-6 bg-gray-300 rounded-full
                            peer-checked:bg-teal-600 transition-colors duration-300"
                    ></div>
                    <div
                        className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full
                            peer-checked:translate-x-5 transition-transform duration-300"
                    ></div>
                </label>
            </div>
        </>
    );
}
