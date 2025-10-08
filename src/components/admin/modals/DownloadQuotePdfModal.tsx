import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { PiFilePdfBold } from "react-icons/pi";
import { RiMailSendLine } from "react-icons/ri";
import { generateQuotePdf, sendQuoteEmail } from "../../../api/QuoteAPI";
import { toast } from "react-toastify";

export default function DownloadQuotePdfModal() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("quoteId")!
  const client = query.get("client")!
  const email = query.get("email")!
  const { data } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => generateQuotePdf(+id),
  })
  const url = window.URL.createObjectURL(new Blob([data]));
  const { mutate} = useMutation({
    mutationFn: sendQuoteEmail,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => toast.success(data.message)
  })
  const handleSendEmailUrl = () => {
    const data ={
      id:+id,
      client,
      email
    }
    mutate(data)
  }
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto px-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-50 p-6 flex flex-col max-h-[90vh]">
        <div className="flex flex-col gap-5">
          <a
            href={url}
            download={`cotización-${id}.pdf`}
            className="flex items-center justify-center gap-3 bg-rose-600 text-white px-4 py-2 rounded text-center"
          ><span className="text-2xl"><PiFilePdfBold /></span> <span>Descargar </span></a>

          <button
            onClick={handleSendEmailUrl}
            className="flex items-center cursor-pointer justify-center gap-3 bg-teal-600 text-white px-4 py-2 rounded text-center"
          ><span className="text-2xl"><RiMailSendLine /></span> <span>Enviar</span></button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 text-white p-2 rounded cursor-pointer"
          >Cerrar</button>
        </div>

      </div>
    </div>
  )
}