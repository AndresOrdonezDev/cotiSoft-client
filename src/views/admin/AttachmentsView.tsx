import { FiPlus } from "react-icons/fi";
import { useAttachments } from "../../hooks/UseAttachment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../components/shared/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAttachment, toggleAttachmentActive } from "../../api/AttachmentAPI";
import { toast } from "react-toastify";

const URL_BACKEND = import.meta.env.VITE_API_URL_FILE

export default function AttachmentsView() {
  const [showActives, setShowActives] = useState(1);
 
  const { data, isError, isLoading } = useAttachments(showActives);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: toggleAttachmentActive,
    onError: (error) => {
      toast.error(error.message || "Error al cambiar el estado del adjunto");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Estado actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    },
  });

  const attachmentTypes = {
    1: "Producto",
    2: "Servicio",
    3: "Productos y Servicios"
  };

  const handleMutationDeleteAttachment = useMutation({
    mutationFn:deleteAttachment,
    onError:(data)=> toast.error(data.message),
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    }
  })

  

  if (isLoading) return <div className="flex items-center justify-center"><Spinner /></div>;
  if (isError) return <p>Error al consultar los adjuntos</p>;
  if (data)
    return (
      <div className="w-full h-screen lg:px-12">
        <div className="sticky top-0 bg-gray-100 pt-6 lg:pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="lg:text-2xl text-lg font-bold text-slate-700">Adjuntos</h1>

            <button
              onClick={() => navigate('?newAttachment=true')}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 lg:py-2 py-1 rounded-lg hover:bg-teal-700 transition">
              <FiPlus size={18} />
              Nuevo Adjunto
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
           
            <div className="flex gap-2">
              <button
                onClick={() => setShowActives(1)}
                className={`px-3 rounded-lg transition ${showActives === 1
                    ? 'border border-green-400 text-gray-700'
                    : 'text-gray-500 hover:bg-gray-300'
                  }`}
              >
                Activos
              </button>
              <button
                onClick={() => setShowActives(0)}
                className={`px-3 rounded-lg transition ${showActives === 0
                    ? 'border border-red-400 text-gray-700'
                    : ' text-gray-500 hover:bg-gray-300'
                  }`}
              >
                Inactivos
              </button>
            </div>
          </div>
          <hr />
        </div>

        {/* Lista de Adjuntos */}
        <div className="grid grid-cols-1 gap-4 pb-6 lg:pb-12 mt-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No se encontraron adjuntos</p>
          ) : (
            data.map((attachment) => (
              <div
                key={attachment.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{attachment.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Tipo: <span className="font-medium">{attachmentTypes[attachment.attachmentType as keyof typeof attachmentTypes]}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Creado: {new Date(attachment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <a
                      href={URL_BACKEND + attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 bg-blue-500 text-gray-100 rounded-lg transition"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => navigate(`?editAttachment=true&attachmentId=${attachment.id}`)}
                      className="px-2 bg-amber-500 text-gray-100 rounded-lg transition cursor-pointer"
                    >
                      Editar
                    </button>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {attachment.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                      <button
                        onClick={() => mutate(attachment.id)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                          attachment.isActive ? 'bg-green-500' : 'bg-red-400'
                        }`}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            attachment.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <button
                      onClick={()=>handleMutationDeleteAttachment.mutate(attachment.id)}
                     className="bg-red-300 px-2 rounded-lg text-sm text-gray-900 py-0.5 cursor-pointer"
                    >Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
}