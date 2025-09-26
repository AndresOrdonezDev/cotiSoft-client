import { isAxiosError } from "axios";
import api from "../lib/axios";
import { clientSchemaAPI, type ClientForm } from "../types/client";

export async function createClient(formData:ClientForm) {
    try {
        const { data } = await api.post('/client',formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            throw error.response?.data
        }
        throw new Error('Error al crear el cliente')
    }
}

export async function getClients() {
    try {
        const { data } = await api('/client')
        const result = clientSchemaAPI.safeParse(data)
        if (result.success) {
            return result.data
        }
        throw Error('Error al consultar los clientes')
    } catch (error) {
        if (isAxiosError(error)) {
            throw error
        }
        throw new Error('Error al consultar clientes')
    }
}