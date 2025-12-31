import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AttachmentFormComponent from "../forms/AttachmentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttachment } from "../../../api/AttachmentAPI";
import { toast } from "react-toastify";
import type { AttachmentForm } from "../../../types/attachment";
import { useState, useEffect } from "react";
import { useAttachmentById } from "../../../hooks/UseAttachment";
import Spinner from "../../shared/Spinner";

const URL_BACKEND = import.meta.env.VITE_API_URL_FILE
export default function EditAttachmentModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const attachmentId = Number(searchParams.get("attachmentId"));
  const [file, setFile] = useState<File | null>(null);

  const { data, isLoading, isError } = useAttachmentById(attachmentId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttachmentForm>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        attachmentType: data.attachmentType,
        file: null,
      });
    }
  }, [data, reset]);

  const { mutate } = useMutation({
    mutationFn: updateAttachment,
    onError: (data: any) => toast.error(data.message || "Error al actualizar el adjunto"),
    onSuccess: (data: any) => {
      toast.success(data.message || "Adjunto actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
      queryClient.invalidateQueries({ queryKey: ["attachment", attachmentId] });
      navigate(-1);
    },
  });

  const handleUpdateAttachment = (formData: AttachmentForm) => {
    const attachmentData: AttachmentForm = {
      ...formData,
      file,
    };

    mutate({
      id: attachmentId,
      formData: attachmentData,
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-red-500">Error al cargar el adjunto</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Editar Adjunto</h2>
        <div className="overflow-y-auto pr-2 flex-1">
          <form
            noValidate
            onSubmit={handleSubmit(handleUpdateAttachment)}
            className="space-y-4"
          >
            <AttachmentFormComponent
              register={register}
              errors={errors}
              onFileChange={setFile}
              isEdit={true}
            />

            {data && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Archivo actual:</strong>{" "}
                  <a
                    href={URL_BACKEND+data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ver archivo
                  </a>
                </p>
              </div>
            )}

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
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}