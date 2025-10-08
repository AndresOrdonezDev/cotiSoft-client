import { FiCheckCircle, FiXCircle,FiClock } from "react-icons/fi";
type SelectStateQuoteCardProps ={
    handleChangeEstado: (nuevoEstado: string) => void
    stateSelected: string
}
export default function SelectStateQuoteCard({handleChangeEstado,stateSelected}:SelectStateQuoteCardProps) {
    return (
        <div className="absolute top-2 right-8 w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 space-y-3 z-10 animate-in fade-in slide-in-from-top-2">
            <span className="block text-sm font-semibold text-gray-700 border-b pb-1">
                Cambiar estado
            </span>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
                <label
                    onClick={() => handleChangeEstado("Pendiente")}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition"
                >
                    <input
                        type="radio"
                        checked={stateSelected === "Pendiente"}
                        onChange={() => { }}
                        className="accent-yellow-500"
                    />
                    <FiClock className="w-4 h-4 text-yellow-500" />
                    Pendiente
                </label>

                <label
                    onClick={() => handleChangeEstado("Aceptada")}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition"
                >
                    <input
                        type="radio"
                        checked={stateSelected === "Aceptada"}
                        onChange={() => { }}
                        className="accent-green-600"
                    />
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    Aceptada
                </label>

                <label
                    onClick={() => handleChangeEstado("Rechazada")}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition"
                >
                    <input
                        type="radio"
                        checked={stateSelected === "Rechazada"}
                        onChange={() => { }}
                        className="accent-red-500"
                    />
                    <FiXCircle className="w-4 h-4 text-red-500" />
                    Rechazada
                </label>
            </div>
        </div>
    )
}