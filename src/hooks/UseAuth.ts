import { useQuery } from "@tanstack/react-query";
import { getAuthSession } from "../api/AuthAPI";

export const useAuth = ()=>{
    
    const {data:userAuthenticated, isError, isLoading} = useQuery({
        queryKey:['user'],
        queryFn:getAuthSession,
        retry:1,
        refetchOnWindowFocus:false
    })

    return{
        userAuthenticated, isError, isLoading
    }
}

