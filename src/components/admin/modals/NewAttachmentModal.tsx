import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AttachmentFormComponent from "../forms/AttachmentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttachment } from "../../../api/AttachmentAPI";
import { toast } from "react-toastify";
import type { AttachmentForm } from "../../../types/attachment";
import { useState } from "react";

export default function NewAttachmentModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttachmentForm>();

  const { mutate } = useMutation({
    mutationFn: createAttachment,
    onError: (data: any) => toast.error(data.message || "Error al crear el adjunto"),
    onSuccess: (data: any) => {
      toast.success(data.message || "Adjunto creado exitosamente");
      reset();
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
      navigate(-1);
    },
  });

  const handleCreateNewAttachment = (formData: AttachmentForm) => {
    if (!file) {
      toast.error("Debe seleccionar un archivo");
      return;
    }

    const attachmentData: AttachmentForm = {
      ...formData,
      file,
    };

    mutate(attachmentData);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Nuevo Adjunto</h2>
        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleCreateNewAttachment)}
            className="space-y-4"
          >
            <AttachmentFormComponent
              register={register}
              errors={errors}
              onFileChange={setFile}
            />
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
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
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