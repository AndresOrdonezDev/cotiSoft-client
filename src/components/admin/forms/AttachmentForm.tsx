import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { AttachmentForm } from "../../../types/attachment";

type AttachmentFormProps = {
  register: UseFormRegister<AttachmentForm>;
  errors: FieldErrors<AttachmentForm>;
  onFileChange: (file: File | null) => void;
  isEdit?: boolean;
};

export default function AttachmentFormComponent({
  register,
  errors,
  onFileChange,
  isEdit = false
}: AttachmentFormProps) {
  return (
    <>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del adjunto
        </label>
        <input
          type="text"
          placeholder="Nombre del adjunto"
          className="w-full border rounded px-3 py-2"
          {...register("name", {
            required: "Ingrese el nombre del adjunto",
          })}
        />
        {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name.message}</p>}
      </div>

      {/* Tipo de adjunto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de adjunto
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          {...register("attachmentType", {
            required: "Seleccione el tipo de adjunto",
            valueAsNumber: true
          })}
        >
          <option value="">-- Tipo de adjunto --</option>
          <option value={1}>Producto</option>
          <option value={2}>Servicio</option>
          <option value={3}>Productos y Servicios</option>
        </select>
        {errors.attachmentType && (
          <p className="text-red-400 mt-1 text-sm">{errors.attachmentType.message}</p>
        )}
      </div>

      {/* Archivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Archivo {!isEdit && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          className="w-full border rounded px-3 py-2"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            onFileChange(file);
          }}
        />
        <p className="text-xs text-gray-500 mt-1">
          Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
        </p>
        {!isEdit && (
          <p className="text-xs text-gray-500">
            El archivo es obligatorio para crear un nuevo adjunto
          </p>
        )}
        {isEdit && (
          <p className="text-xs text-gray-500">
            Dejar vacío para mantener el archivo actual
          </p>
        )}
      </div>
    </>
  );
}