import { FiSearch} from "react-icons/fi";
type QuoteSearchClientBarProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,
  handleSearch: () => void,
  searchInput: string,
}
export default function QuoteSearchClientBar({ setSearchInput, handleSearch, searchInput }: QuoteSearchClientBarProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar por identificación o email.."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 
                                 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
      />
      <FiSearch
        onClick={handleSearch}
        size={20}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
      />
    </div>
  )
}