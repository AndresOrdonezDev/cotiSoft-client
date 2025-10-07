import { useQuery } from "@tanstack/react-query";
import { generateQuotePdf } from "../../../api/QuoteAPI";
import { useLocation, useNavigate } from "react-router-dom";

export default function DownloadQuotePdfModal() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("quoteId")!
  const { data } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => generateQuotePdf(+id),
  })
  const url = window.URL.createObjectURL(new Blob([data]));
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
        <div className="flex flex-col">
          <a href={url} download={`cotización-${id}.pdf`} className="bg-teal-600 text-white px-4 py-2 rounded">descargar </a>
          <button onClick={() => navigate(-1)}>Cerrar</button>
        </div>

      </div>
    </div>
  )
}