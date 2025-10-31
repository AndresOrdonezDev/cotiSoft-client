import { FiSearch, FiXCircle } from "react-icons/fi";
type ProductSearchBarProps ={
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  setShowActives: React.Dispatch<React.SetStateAction<number>>,
  searchInput: string,
  search: string,
  showActives: number
}
export default function ProductSearchBar({setSearchInput,setSearch,setShowActives,searchInput,search,showActives}:ProductSearchBarProps) {
  return (
     <div className="flex flex-col lg:flex-row lg:gap-10 gap-3 items-center mb-4 lg:mb-8">
            <div className="relative w-full lg:w-xl">
              <input
                type="text"
                placeholder="Buscar nombre o descripción"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 p-1 lg:py-2 text-gray-700 
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
              onClick={() => setShowActives(showActives === 1 ? 0 : 1)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <span className="text-sm font-medium text-gray-700">
                {showActives === 1 ? "Activos" : "Inactivos"}
              </span>
              <div
                className={`w-10 h-4 lg:w-14 lg:h-8 flex items-center rounded-full p-1 transition-colors duration-300
                          ${showActives === 1 ? "bg-teal-600" : "bg-gray-600"}`}
              >
                <div
                  className={`w-3 h-3 lg:w-6 lg:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
                            ${showActives === 1 ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
            </div>
          </div>
  )
}