import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilePdfBold } from "react-icons/pi";
import { RiMailSendLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { generateQuotePdf, sendQuoteEmail } from "../../../api/QuoteAPI";
import { toast } from "react-toastify";
import Spinner from "../../shared/Spinner";
import { useState } from "react";
import { getClientEmails } from "../../../api/ClientAPI";

export default function DownloadQuotePdfModal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state.id;
  const client = state.client;
  const client_id = state.client_id;
  const email = state.email;

  const { data: emailList } = useQuery({
    queryKey: ["clientEmails", client_id],
    queryFn: () => getClientEmails(client_id)
  })

  const [showEmailSelector, setShowEmailSelector] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => generateQuotePdf(+id),
  });

  const url = window.URL.createObjectURL(new Blob([data]));

  const { mutate, isPending } = useMutation({
    mutationFn: sendQuoteEmail,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => {
      toast.success(data.message);
      setShowEmailSelector(false);
      setSelectedEmails([]);
    },
    retry: false,
  });

  const handleShowEmailSelector = () => {
    setShowEmailSelector(true);
  };

  const handleBackToButtons = () => {
    setShowEmailSelector(false);
    setSelectedEmails([]);
  };

  const handleToggleEmail = (emailAddress: string) => {
     setSelectedEmails((prev) =>
       prev.includes(emailAddress)
         ? prev.filter((e) => e !== emailAddress)
         : [...prev, emailAddress]
     );
   };

  const handleToggleAll = () => {
    if (emailList) {
      if (selectedEmails.length === emailList.length) {
        setSelectedEmails([]);
      } else {
        setSelectedEmails(emailList.map((e) => e.email));
      }
    }

  };

  const handleSendEmail = () => {
    const allEmails = [email, ...selectedEmails];
   const data = {
     id: +id,
     client,
     emails: allEmails, // Un solo array con todos los destinatarios
   };

   mutate(data)
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-50 overflow-y-auto px-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-20 p-6 flex flex-col max-h-[90vh] relative">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <IoClose />
        </button>

        <div className="flex flex-col gap-5 mt-8">
          {isPending ? (
            <>
              <div className="h-[80px] flex items-center justify-center">
                <Spinner />
              </div>
              <h4 className="text-center text-gray-500">Enviando...</h4>
            </>
          ) : (
            <>
              {showEmailSelector ? (
                /* select to email from list */
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={handleBackToButtons}
                      className="text-gray-600 hover:text-gray-800 text-xl"
                    >
                      <MdArrowBack />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Seleccionar destinatarios
                    </h3>
                  </div>

                  {/* main email */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Correo principal
                    </p>
                    <p className="text-sm text-blue-700">{email}</p>
                  </div>

                  {/* email list */}
                  {emailList && emailList.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-700">
                          Destinatarios adicionales
                        </p>
                        <button
                          onClick={handleToggleAll}
                          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                          {selectedEmails.length === emailList.length
                            ? "Deseleccionar todos"
                            : "Seleccionar todos"}
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                        {emailList.map((emailItem) => (
                          <label
                            key={emailItem.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedEmails.includes(emailItem.email)}
                              onChange={() => handleToggleEmail(emailItem.email)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">
                              {emailItem.email}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* send button */}
                  <button
                    onClick={handleSendEmail}
                    disabled={isPending}
                    className="flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-2xl">
                      <RiMailSendLine />
                    </span>
                    <span>
                      Enviar a {selectedEmails.length + 1} destinatario
                      {selectedEmails.length !== 0 ? "s" : ""}
                    </span>
                  </button>
                </div>
              ) : (
                /* main buttons */
                <>
                  <button
                    onClick={handleShowEmailSelector}
                    className="flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
                  >
                    <span className="text-2xl">
                      <RiMailSendLine />
                    </span>
                    <span>Enviar por correo</span>
                  </button>

                  <a
                    href={url}
                    download={`cotización-${id}.pdf`}
                    className="flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
                  >
                    <span className="text-2xl">
                      <PiFilePdfBold />
                    </span>
                    <span>Descargar PDF</span>
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}