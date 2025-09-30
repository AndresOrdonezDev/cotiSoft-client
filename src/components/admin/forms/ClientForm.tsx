import departments from '../../../data/departments.json'
import cities from '../../../data/cities.json'
import { useMemo} from "react";
import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { ClientForm } from '../../../types/client';

type ClientFormProps = {
  register: UseFormRegister<ClientForm>
  errors: FieldErrors<ClientForm>
  watch: UseFormWatch<ClientForm>
}

export default function ClientForm({ register, errors,watch }: ClientFormProps) {

  const selectedDepartment = watch("department");
   
  const citiesFiltered = useMemo(() => {
    if (!selectedDepartment) return [];
    return cities.filter(city => city.department === selectedDepartment);
  }, [selectedDepartment]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Nombre completo [Apellidos Nombres]"
          className="w-full border rounded px-3 py-2"
          {...register("fullname", {
            required: "Ingrese apellidos y nombres del cliente",
          })}
        />
        {errors.fullname && (
          <p className="text-center mt-1 text-red-400">
            {errors.fullname.message}
          </p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Nombre de la empresa (opcional)"
          className="w-full border rounded px-3 py-2"
          {...register("companyName")}
        />
      </div>
      <div>
        <select
          className="w-full border rounded px-3 py-2"
          {...register("identificationType", {
            required: "Seleccione el tipo de identificación",
          })}
        >
          <option value="">-- Seleccione tipo de documento --</option>
          <option value={1}>Cédula</option>
          <option value={2}>NIT</option>
        </select>
        {errors.identificationType && (
          <p className="text-center mt-1 text-red-400">
            {errors.identificationType.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Número de identificación"
          className="w-full border rounded px-3 py-2"
          {...register("idNumber", {
            required: "Ingrese el número de identificación",
          })}
        />
        {errors.idNumber && (
          <p className="text-center mt-1 text-red-400">
            {errors.idNumber.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Teléfono o celular"
          className="w-full border rounded px-3 py-2"
          {...register("contact", {
            required: "Ingrese un número de contacto",
          })}
        />
        {errors.contact && (
          <p className="text-center mt-1 text-red-400">
            {errors.contact.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded px-3 py-2"
          {...register("email", {
            required: "Ingrese un correo electrónico",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingrese un correo válido",
            },
          })}
        />
        {errors.email && (
          <p className="text-center mt-1 text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Dirección"
          className="w-full border rounded px-3 py-2"
          {...register("address", {
            required: "Ingrese la dirección del cliente",
          })}
        />
        {errors.address && (
          <p className="text-center mt-1 text-red-400">
            {errors.address.message}
          </p>
        )}
      </div>

      <div>
        <select
          className="w-full border rounded px-3 py-2"
          {...register("department", {
            required: "Seleccione un departamento",
          })}
        >
          <option value="">-- Seleccione un departamento --</option>
          {departments.map(item => (
            <option key={item.code} value={item.code}>{item.department}</option>
          ))}
        </select>
        {errors.department && (
          <p className="text-center mt-1 text-red-400">
            {errors.department.message}
          </p>
        )}
      </div>
      {citiesFiltered.length > 0 && <div>
        <select
          className="w-full border rounded px-3 py-2"
          {...register("city", {
            required: "Seleccione una ciudad",
          })}
        >
          <option value="">-- Seleccione una ciudad--</option>
          {citiesFiltered.map(item => (
            <option key={item.code} value={item.code}>{item.city}</option>
          ))}
        </select>
        {errors.city && (
          <p className="text-center mt-1 text-red-400">
            {errors.city.message}
          </p>
        )}
      </div>}
    </>
  );
}
