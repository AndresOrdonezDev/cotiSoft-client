import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/ProductAPI"

export const useProducts = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: getProducts,
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}