import { FiSearch, FiXCircle } from "react-icons/fi";
type QuoteSearchBarProps = {
    setSearchInput: React.Dispatch<React.SetStateAction<string>>,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setShowState: React.Dispatch<React.SetStateAction<number>>,
    searchInput: string,
    search: string,
}
export default function QuoteSearchBar({ setSearchInput, setShowState, setSearch, searchInput, search }: QuoteSearchBarProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-8">
            <div className="relative w-full lg:w-xl">
                <input
                    type="text"
                    placeholder="Buscar nombre o descripción"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-gray-700 
                               focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
                />
                {!search && <FiSearch
                    onClick={() => setSearch(searchInput)}
                    size={20}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                />}
                {search && <FiXCircle
                    onClick={() => [setSearch(""), setSearchInput("")]}
                    size={20}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                />}
            </div>
            <div

                className="flex items-center gap-3 cursor-pointer"
            >
                <button
                    className="border border-amber-300 rounded-lg px-2 bg-amber-300 text-black cursor-pointer"
                    onClick={() => setShowState(1)}
                >Pendientes</button>
                <button
                    className="border border-teal-300 rounded-lg px-2 bg-teal-300 text-black cursor-pointer"
                    onClick={() => setShowState(1)}
                >Aceptadas</button>
                <button
                    className="border border-rose-300 rounded-lg px-2 bg-rose-300 text-black cursor-pointer"
                    onClick={() => setShowState(1)}
                >Rechazadas</button>
            </div>
        </div>
    )
}