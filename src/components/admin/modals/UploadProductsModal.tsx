import { useState } from "react"
import { FiSearch, FiXCircle } from "react-icons/fi"
import UploadProductCard from "../cards/UploadProductCard"
import { useProducts } from "../../../hooks/UseProduct"
import type { Product } from "../../../types/product"
type UploadProductsModalProps = {
    setShowModalUploadProducts: React.Dispatch<React.SetStateAction<boolean>>
    handleAddProduct: (product:Product) => void
}
export default function UploadProductsModal({ setShowModalUploadProducts,handleAddProduct }: UploadProductsModalProps) {
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const { data, isError, isLoading } = useProducts(1, search)
    if (isError) return <p>Error al traer los productos</p>
    if (isLoading) return <p>Cargando...</p>
    if (data) return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/70 z-10 overflow-y-auto">
            <div className="bg-white relative rounded-xl shadow-lg w-full max-w-lg mt-10 p-6 flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-700">Buscar y cargar productos</h2>
                <div className="overflow-y-auto pr-2 flex-1">
                    <div
                        className="space-y-4"
                    >
                        <div className="relative w-full p-1">
                            <input
                                type="text"
                                placeholder="Buscar por nombre o descripción"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 
                                                 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 pr-1"
                            />
                            {!search && <FiSearch
                                onClick={() => setSearch(searchInput)}
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            />}
                            {search && <FiXCircle
                                onClick={() => [setSearch(""), setSearchInput("")]}
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            />}
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-1 rounded max-h-dvh">
                            <div>
                                {data.map(product => (
                                    <UploadProductCard
                                        key={product.id}
                                        product={product}
                                        handleAddProduct={handleAddProduct}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowModalUploadProducts(false)}
                            className="text-red-500 hover:text-red-600 cursor-pointer absolute top-5 right-5"
                        >
                            <FiXCircle
                                size={25}
                            />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}