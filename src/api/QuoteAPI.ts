import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { quoteSchemaAPI, type QuoteProductsForm } from '../types/quote'

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

export async function getQuotes() {
    try {
        const { data } = await api('/quote')
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
export async function generateQuotePdf(id: number) {
    try {
        const response = await api.get(`/quote/generate-pdf/${id}`, {
            responseType: 'blob', // 👈 Muy importante para PDF o archivos binarios
        });

        // Crear un objeto URL a partir del blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace invisible y simular clic para descargar
        const a = document.createElement('a');
        a.href = url;
        a.download = `cotizacion-${id}.pdf`; // 👈 nombre dinámico opcional
        document.body.appendChild(a);
        a.click();

        // Limpiar
        a.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error al generar PDF:', error.response?.data || error.message);
            throw error;
        }
        throw new Error('Error al generar el PDF');
    }
}
