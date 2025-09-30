import { useQuery } from "@tanstack/react-query"
import { getProductById, getProducts } from "../api/ProductAPI"
import type { Product } from "../types/product"

export const useProducts = (isActive:number,search:string) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['products',isActive,search],
        queryFn: ()=> getProducts({isActive,search}),
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

