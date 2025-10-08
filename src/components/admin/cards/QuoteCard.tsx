
import { useNavigate } from "react-router-dom"
import { FaRegFilePdf } from "react-icons/fa6";
import type { Quote } from "../../../types/quote"
import { formatCurrency, formatDate } from "../../../utils"

type QuoteCardProps = {
    quote: Quote
}
export default function QuoteCard({ quote }: QuoteCardProps) {
    const navigate = useNavigate()
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition bg-white"
        >
            <div>
                <p className="font-medium text-slate-700">Cot. N°-{quote.id} — {quote.client.fullname}</p>
                <p className="text-sm text-gray-500">{quote.client.companyName}</p>
                <p className="text-sm text-gray-500">{formatDate(quote.createdAt)}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center gap-4">
                <span className="font-semibold text-gray-700">{formatCurrency(quote.total)}</span>
                <button
                    className="border border-gray-500 px-3 bg-gray-500 text-gray-100 rounded-lg cursor-pointer"
                >Editar</button>
                <span
                    className={`px-3 py-1 text-xs rounded-full 
                  ${quote.status === "Aprobada"
                            ? "bg-teal-100 text-teal-700"
                            : quote.status === "Pendiente"
                                ? "bg-amber-200 text-amber-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {quote.status}
                </span>
                <button className="text-rose-600 p-1 cursor-pointer" onClick={()=>navigate(`?modalQuoteDownload=true&quoteId=${quote.id}&client=${quote.client.fullname}&email=${quote.client.email}`)}>
                        <FaRegFilePdf size={20}/>
                </button>

            </div>
        </div>
    )
}