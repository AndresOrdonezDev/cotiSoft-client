import { useQuery } from "@tanstack/react-query"
import { getClientById, getClients } from "../api/ClientAPI"
import type { Client } from "../types/client"

export const useClients = (isActive: number, search: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['clients', isActive, search],
    queryFn: () => getClients({ isActive, search }),
    retry: false,
    refetchOnWindowFocus: true
  })
  return { data, isError, isLoading }
}
export const useClientById = (id:Client['id']) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['client',id],
        queryFn: ()=>getClientById(id),
        retry: false,
        refetchOnWindowFocus: true
    })
    return { data, isError, isLoading }
}
