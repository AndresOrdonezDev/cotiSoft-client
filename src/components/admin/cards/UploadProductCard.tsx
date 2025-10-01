import { FiPlusCircle } from "react-icons/fi"
import type { Product, ProductQuote } from "../../../types/product"
import { formatCurrency } from "../../../utils"
type UploadProductCardProps = {
    product:Product,
    handleAddProduct: (product:ProductQuote) => void
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
                    onClick={()=>handleAddProduct({...product, quantity:1,product_id:product.id})}
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