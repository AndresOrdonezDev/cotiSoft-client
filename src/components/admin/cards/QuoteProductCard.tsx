import { FiMinusCircle, FiPlusCircle, FiXCircle } from "react-icons/fi";
import { formatCurrency } from "../../../utils";
import type { ProductQuote } from "../../../types/product";
type QuoteProductCardProps = {
    product: ProductQuote,
    productsToQuote: ProductQuote[],
    setProductsToQuote: React.Dispatch<React.SetStateAction<ProductQuote[]>>
    increaseQuantity: (id: ProductQuote['product_id']) => void
}
export default function QuoteProductCard({ product, productsToQuote, setProductsToQuote, increaseQuantity }: QuoteProductCardProps) {
    const decreaseQuantity = (id: ProductQuote['product_id']) => {
        const updateList = productsToQuote.map(product => {
            if (product.product_id === id && product.quantity > 1) {
                return {
                    ...product,
                    quantity: product.quantity - 1
                };
            }
            return product;
        });
        setProductsToQuote(updateList);
    };
    const handleRemoveProductQuote = (id: ProductQuote['product_id']) => {
        const updateList = productsToQuote.filter(product => product.product_id !== id)
        setProductsToQuote(updateList)
    }
    return (
        <div
            className="px-5 py-2 border-2 border-gray-100 flex justify-between"
        >
            <div className="flex flex-col w-full">
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p className="text-teal-700 font-semibold">{formatCurrency(product.price)}</p>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(product.product_id)} className=" hover:text-gray-700 transition-colors text-gray-500">
                        <FiMinusCircle size={20} />
                    </button>
                    <span className="w-2 lg:w-8 lg:text-xl text-center font-semibold text-gray-700">
                        {product.quantity}
                    </span>
                    <button onClick={() => increaseQuantity(product.product_id)} className=" hover:text-gray-700 transition-colors text-gray-500">
                        <FiPlusCircle size={20} />
                    </button>
                </div>
                <button
                    onClick={() => handleRemoveProductQuote(product.product_id)}
                    className="text-red-600 cursor-pointer">
                    <FiXCircle size={20} />
                </button>
            </div>
        </div>
    )
}