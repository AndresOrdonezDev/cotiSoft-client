import { FiPlusCircle } from "react-icons/fi"
import type { Product } from "../../../types/product"
import { formatCurrency } from "../../../utils"
type UploadProductCardProps = {
    product:Product,
    handleAddProduct: (product:Product) => void
}
export default function UploadProductCard({product,handleAddProduct}:UploadProductCardProps) {
    
    return (
        <div className="flex items-center justify-between border-b-1 border-gray-300 py-1">
            <div className="text-sm text-gray-700 rounded">
                <p>{product.name}</p>
                <p>{product.description}</p>
            </div>
            <p>{formatCurrency(product.price)}</p>
            <div>
                <button 
                    onClick={()=>handleAddProduct(product)}
                >
                    <FiPlusCircle
                        size={20}
                        className="right-2 text-teal-600 cursor-pointer"
                    />
                </button>
            </div>
        </div>
    )
}