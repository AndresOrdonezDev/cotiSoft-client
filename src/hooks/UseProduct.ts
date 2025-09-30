import { useQuery } from "@tanstack/react-query"
import { getProductById, getProducts } from "../api/ProductAPI"
import type { Product } from "../types/product"

export const useProducts = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}

export const useProductById = (id:Product["id"])=>{
    const { data, isError, isLoading } = useQuery({
        queryKey: ['product',id],
        queryFn: ()=>getProductById(id),
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}

