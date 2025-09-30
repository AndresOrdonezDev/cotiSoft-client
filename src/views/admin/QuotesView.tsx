import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { getQuotes } from "../../api/QuoteAPI";
import { useNavigate } from "react-router-dom";
import QuoteSearchBar from "../../components/admin/searchBars/QuoteSearchBar";
import { useState } from "react";
import QuoteCard from "../../components/admin/cards/QuoteCard";

export default function QuotesView() {
  const navigate = useNavigate()
  const [showState, setShowState] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const { data, isError, isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    retry: false
  })
  if (isLoading) return <p>cargando...</p>
  if (isError) return <p>Error al consultar las cotizaciones</p>
  if (data) return (
    <div className="w-full h-screen lg:px-12">
      <div className="sticky top-0 bg-gray-100 pt-6 lg:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-700">Cotizaciones</h1>
          <button
            onClick={() => navigate('/newQuote')}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
            <FiPlus size={18} />
            Nueva Cotización
          </button>
        </div>
        <QuoteSearchBar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          setSearch={setSearch}
          search={search}
          setShowState={setShowState}
        />
        <hr />
      </div>
      {/* Lista de Cotizaciones */}
      <div className="grid grid-cols-1 gap-2 lg:gap-1 pb-6 lg:pb-12 mt-6">
        {data.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
          />
        ))}
      </div>
    </div>
  );
}
