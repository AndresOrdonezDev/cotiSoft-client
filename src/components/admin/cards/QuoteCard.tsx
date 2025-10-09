import { useNavigate } from "react-router-dom"
import { FaRegFilePdf } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import type { Quote } from "../../../types/quote"
import { formatCurrency, formatDate } from "../../../utils"
import { useState } from "react";
import SelectStateQuoteCard from "./SelectStateQuoteCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusQuote } from "../../../api/QuoteAPI";
import { toast } from "react-toastify";
type QuoteCardProps = {
    quote: Quote
}
export default function QuoteCard({ quote }: QuoteCardProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [stateSelected, setStateSelected] = useState(quote.status);
    const handleModalDownload = (id: number, client: string, email: string) => {
        navigate('?modalQuoteDownload=true', {
            state: {
                id,
                client,
                email
            }
        })
    }
    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };
    const {mutate} = useMutation({
        mutationFn:updateStatusQuote,
        onError:(data)=>toast.error(data.message),
        onSuccess:(data)=>{
            toast.success(data.message,{toastId:'newStatusQuote'})
            queryClient.invalidateQueries({queryKey:['quotes']})
        }
    })

    const handleChangeEstado = (newStatus: string) => {
        setStateSelected(newStatus);
        setOpenMenuId(null);
        const data = {
            id:quote.id,
            status:newStatus
        }
        mutate(data)
    };
    return (
        <div
            className="flex relative flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition bg-white"
        >
            <button
                onClick={() => toggleMenu(quote.id)}
                className="absolute top-1 right-1 p-1 rounded-md hover:bg-gray-100 transition"
            >
                <CiMenuKebab size={20} className="text-gray-600" />
            </button>
            
            {openMenuId === quote.id && (
                <SelectStateQuoteCard
                    handleChangeEstado={handleChangeEstado}
                    stateSelected={stateSelected}
                />
            )}
            <div>
                <p className="font-medium text-slate-700">Cot. N°-{quote.id} — {quote.client.fullname}</p>
                <p className="text-sm text-gray-500">{quote.client.companyName}</p>
                <p className="text-sm text-gray-500">{quote.client.email}</p>
                <p className="text-sm text-gray-500">{formatDate(quote.createdAt)}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center gap-4">
                <span className="font-semibold text-gray-700">{formatCurrency(quote.total)}</span>
                <button
                    onClick={() => navigate(`/editQuote/${quote.id}`)}
                    className="border border-gray-500 px-3 bg-gray-500 text-gray-100 rounded-lg cursor-pointer"
                >Editar</button>
                <span
                    className={`px-3 py-1 text-xs rounded-full 
                  ${quote.status === "Aceptada"
                            ? "bg-teal-100 text-teal-700"
                            : quote.status === "Pendiente"
                                ? "bg-amber-200 text-amber-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {quote.status}
                </span>
                <button className="text-rose-600 p-1 cursor-pointer" onClick={() => handleModalDownload(quote.id, quote.client.fullname, quote.client.email)}>
                    <FaRegFilePdf size={20} />
                </button>

            </div>
        </div>
    )
}