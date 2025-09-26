import {isAxiosError} from 'axios'
import api from '../lib/axios'
import { quoteSchemaAPI } from '../types/quote'

export async function getQuotes(){
    try {
        const {data} = await api('/quote')
        const result = quoteSchemaAPI.safeParse(data)
        console.log(data)
        if(result.success){
            return result.data
        }
        throw new Error('Error al consultar cotizaciones')
    } catch (error) {
        if(isAxiosError(error)){
            console.error('Error get quotes:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al consultar cotizaciones')
    }
}
