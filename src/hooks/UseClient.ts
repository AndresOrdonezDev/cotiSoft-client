import { useQuery } from "@tanstack/react-query"
import { getClients } from "../api/ClientAPI"

export const useClients = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients,
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}