import { isAxiosError } from "axios";
import api from "../lib/axios";
import { productSchemaAPI } from "../types/product";


export async function getProducts() {
    try {
        const { data } = await api('/product')
        const result = productSchemaAPI.safeParse(data)
        if (result.success) {
            return result.data
        }
        throw new Error('Error al consultar productos')
    } catch (error) {
        if(isAxiosError(error)){
            console.log(error)
            throw error
        }
        throw new Error('Error al consultar productos')
    }

}