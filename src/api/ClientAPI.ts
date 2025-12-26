import { isAxiosError } from "axios";
import api from "../lib/axios";
import { clientEmailsSchemaAPI, clientSchema, clientSchemaAPI, type Client, type ClientForm, type EmailClientList } from "../types/client";

export async function createClient(formData: ClientForm) {
  try {
    const { data } = await api.post('/client', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al crear el cliente')
  }
}
type getClientsProps = {
  isActive: number
  search: string
}
export async function getClients({ isActive, search = "" }: getClientsProps) {
  try {
    const { data } = await api(`/client?isActive=${isActive}&search=${encodeURIComponent(search)}`)
    const result = clientSchemaAPI.safeParse(data)
    if (result.success) {
      return result.data
    }
    throw Error('Error al consultar los clientes')
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al consultar clientes')
  }
}

export async function getClientById(id: Client['id']) {
  try {
    const { data } = await api(`/client/${id}`)
    const result = clientSchema.safeParse(data)
    if (result.success) {
      return result.data
    }
    throw Error('Error al consultar los clientes')
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al consultar clientes')
  }
}
type updateClientByIdProps = {
  id: Client['id'],
  formData: ClientForm
}
export async function updateClientById({ id, formData }: updateClientByIdProps) {
  try {
    const { data } = await api.put(`/client/${id}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al actualizar el cliente')
  }
}

export async function toggleClientActive(id: Client['id']) {
  try {
    const { data } = await api.post(`/client/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al actualizar el cliente')
  }
}


export async function getClient(search: string) {
  try {
    const { data } = await api(`/client/quote/${search}`)
    const result = clientSchema.safeParse(data)
    if (result.success) {
      return result.data
    }
    throw Error('Error al consultar los clientes')
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al consultar clientes')
  }
}

export async function getClientEmails(id: Client['id']) {
  try {
    const { data } = await api(`/client/${id}/emails`)
    const result = clientEmailsSchemaAPI.safeParse(data)
    if (result.success) {
      return result.data
    }
    throw Error('Error al consultar los correos')
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al consultar correos')
  }
}

export async function addEmailToList(formData: EmailClientList) {
  try {
    const { email, id } = formData
    const { data } = await api.post(`/client/${id}/emails`, { email })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al agregar el correo')
  }
}

export async function deleteEmailFromList(id: number) {
  try {
    const { data } = await api.delete(`/client/${id}/emails`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al eliminar el correo')
  }
}