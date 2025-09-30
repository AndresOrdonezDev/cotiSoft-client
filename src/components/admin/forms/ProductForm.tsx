// src/components/forms/NewProductForm.tsx
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductForm } from "../../../types/product";

type NewProductFormProps = {
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
};

export default function ProductForm({ register, errors }: NewProductFormProps) {
  return (
    <>
      {/* Nombre */}
      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          className="w-full border rounded px-3 py-2"
          {...register("name", {
            required: "Ingrese el nombre del producto",
          })}
        />
        {errors.name && <p className="text-red-400 mt-1">{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <textarea
          placeholder="Descripción"
          className="w-full border rounded px-3 py-2"
          rows={2}
          {...register("description", {
            required: "Ingrese una descripción",
          })}
        />
        {errors.description && <p className="text-red-400 mt-1">{errors.description.message}</p>}
      </div>

      {/* Precio */}
      <div>
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          className="w-full border rounded px-3 py-2"
          {...register("price", {
            required: "Ingrese el precio",
            valueAsNumber: true,
            min: { value: 0, message: "Debe ser mayor o igual a 0" },
          })}
        />
        {errors.price && <p className="text-red-400 mt-1">{errors.price.message}</p>}
      </div>

      {/* Stock */}
      <div>
        <input
          type="number"
          placeholder="Stock"
          className="w-full border rounded px-3 py-2"
          {...register("stock", {
            required: "Ingrese la cantidad en stock",
            valueAsNumber: true,
            min: { value: 0, message: "Debe ser mayor o igual a 0" },
          })}
        />
        {errors.stock && <p className="text-red-400 mt-1">{errors.stock.message}</p>}
      </div>

      {/* IVA */}
      <div>
        <input
          type="number"
          placeholder="IVA (%), Eje: 19, 5 ..."
          className="w-full border rounded px-3 py-2"
          {...register("tax", {
            required: "Ingrese el porcentaje de IVA",
            valueAsNumber: true,
            min: { value: 0, message: "No puede ser negativo" },
          })}
        />
        {errors.tax && <p className="text-red-400 mt-1">{errors.tax.message}</p>}
      </div>

      {/* Tipo de producto */}
      <div>
        <select
          className="w-full border rounded px-3 py-2"
          {...register("productType", { required: "Seleccione el tipo de producto" })}
        >
          <option value="">-- Tipo de producto --</option>
          <option value={1}>Bien</option>
          <option value={2}>Servicio</option>
        </select>
        {errors.productType && (
          <p className="text-red-400 mt-1">{errors.productType.message}</p>
        )}
      </div>
    </>
  );
}
