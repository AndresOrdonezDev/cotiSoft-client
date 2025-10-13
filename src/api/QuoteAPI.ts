import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { quoteResponseSchema, quoteSchemaAPI, type Quote, type QuoteProductsForm} from '../types/quote'

export async function createQuote(formData: QuoteProductsForm) {
    try {
        const { data } = await api.post('/quote', formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error al crear la cotización:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al crear la cotización')
    }
}

export async function getQuotes(showState:string,search:string) {
    try {
        const { data } = await api(`/quote?showState=${showState}&search=${search}`)
        const result = quoteSchemaAPI.safeParse(data)
        if (result.success) {
            return result.data
        }
        throw new Error('Error al consultar cotizaciones')
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error get quotes:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al consultar cotizaciones')
    }
}
export async function getQuoteById(id:number) {
    try {
        const { data } = await api(`/quote/${id}`)
        const result = quoteResponseSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
        throw new Error('Error al consultar la cotización')
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error get quotes:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al consultar cotizaciones')
    }
}
type UpdateQuoteProps = {
    id:number,
    formData: QuoteProductsForm
}
export async function updateQuote({id,formData}:UpdateQuoteProps) {
    try {
        const { data } = await api.put(`/quote/${id}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error al crear la cotización:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al crear la cotización')
    }
}

export async function generateQuotePdf(id: number) {
    try {
        const response = await api.get(`/quote/generate-pdf/${id}`, {
            responseType: "blob"
        });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error al generar PDF:", error.response?.data || error.message);
            throw error;
        }
        throw new Error("Error al generar el PDF");
    }
}
type SendQuoteByEmailProps = {
    id: number,
    client: string,
    email:string
}
export async function sendQuoteEmail({id,client,email}:SendQuoteByEmailProps) {
    try {
        const {data}= await api.post('/quote/send-quote-email',{id,client,email});
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error al generar PDF:", error.response?.data || error.message);
            throw error.response?.data;
        }
        throw new Error("Error al generar el PDF");
    }
}

type UpdateStatusQuoteProps ={
    id:number,
    status:string
}
export async function updateStatusQuote({id,status}:UpdateStatusQuoteProps){
    try {
        const {data} = await api.post(`/quote/update-status/${id}`,{status})
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error al generar PDF:", error.response?.data || error.message);
            throw error.response?.data;
        }
        throw new Error("Error al generar el PDF");
    }
}

export async function deleteQuote(id:Quote["id"]){
    try {
        const { data } = await api.delete(`/quote/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error eliminar Cotización:", error.response?.data || error.message);
            throw error.response?.data;
        }
        throw new Error("Error eliminar Cotización");
    }
}   
