import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiPlus } from "react-icons/fi";
import { getQuotes } from "../../api/QuoteAPI";
import { formatCurrency, formatDate } from "../../utils";

export default function QuotesView() {
    const {data,isError,isLoading} = useQuery({
      queryKey:["quotes"],
      queryFn:getQuotes,
      retry:false
    })
  if(isLoading)return <p>cargando...</p>
  if(isError) return <p>Error al consultar las cotizaciones</p>
  if(data)return (
    <div className="w-full h-full bg-white p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Cotizaciones</h1>
        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
          <FiPlus size={18} />
          Nueva Cotización
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mb-8">
        <input
          type="text"
          placeholder="Buscar por número de cotización o cliente..."
          className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
        />
        <FiSearch
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {/* Lista de Cotizaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {data.map((quote) => (
          <div
            key={quote.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-medium text-slate-700">Cot. N°-{quote.id} — {quote.client.fullname}</p>
              <p className="text-sm text-gray-500">{formatDate(quote.createdAt)}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center gap-4">
              <span className="font-semibold text-gray-700">{formatCurrency(quote.total)}</span>
              <span
                className={`px-3 py-1 text-xs rounded-full 
                  ${
                    quote.status === "Aprobada"
                      ? "bg-green-100 text-green-700"
                      : quote.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {quote.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
