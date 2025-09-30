import { useNavigate } from "react-router-dom"
import type { Product } from "../../../types/product"
import { formatCurrency } from "../../../utils"
import { toggleProductActive } from "../../../api/ProductAPI"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type ProductCardProps = {
    product: Product
    showActives: number
}
export default function ProductCard({ product, showActives }: ProductCardProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: toggleProductActive,
        onError: (data) => toast.error(data.message),
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["products", showActives] })
        }
    })
    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-teal-50 transition ${product.isActive ? 'bg-white' : 'bg-red-50'}`}
        >
            <div>
                <p className="font-medium text-slate-700">{product.name}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <span>{formatCurrency(product.price)}</span>
                <span>Stock: {product.stock}</span>
                <span>IVA: {product.tax}%</span>
                <div className="space-x-3">
                    <button
                        onClick={() => navigate(`?editProduct=true&productId=${product.id}`)}
                        className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                    >Editar</button>
                    <button
                        onClick={() => mutate(product.id)}
                        className={`border rounded-lg px-2 cursor-pointer text-gray-950 
                      ${product.isActive ? 'bg-rose-300 border-rose-300' : 'bg-teal-300 border-teal-300'}`}
                    >{product.isActive ? 'Inactivar' : 'Activar'}</button>
                </div>
            </div>
        </div>
    )
}