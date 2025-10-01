import {isAxiosError} from 'axios'
import api from '../lib/axios'
import { quoteSchemaAPI, type QuoteProductsForm } from '../types/quote'

export async function createQuote(formData:QuoteProductsForm){
    try {
        const {data} = await api.post('/quote',formData)
        return data
    } catch (error) {
        if(isAxiosError(error)){
            console.error('Error al crear la cotización:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al crear la cotización')
    }
}

export async function getQuotes(){
    try {
        const {data} = await api('/quote')
        const result = quoteSchemaAPI.safeParse(data)
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
