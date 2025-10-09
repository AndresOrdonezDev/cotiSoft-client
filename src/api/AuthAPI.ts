import { isAxiosError } from "axios";
import api from "../lib/axios";
import { userSchemaAPI, usersSchemaAPI, type UserLogin } from "../types/auth";

export async function login(formData: UserLogin) {
  try {
    const { data } = await api.post('/auth/login', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al crear el cliente')
  }
}

export async function getAuthSession() {
    try {
        const {data} = await api.get('/auth/user')
        const response = userSchemaAPI.safeParse(data)
        if(response.success){
            return response.data
        }
         throw new Error('Credenciales o token inválido')
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}

export async function logout() {
    try {
        await api('/auth/logout') 
        return
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data)
            throw new Error(error.response.data.message)
        }
    }
}
export async function getUsers() {
    try {
        const {data} = await api('/auth/users')
        const response = usersSchemaAPI.safeParse(data)
        if(response.success){
            return response.data
        }
        throw new Error('Error al traer los usuarios')
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data)
            throw new Error(error.response.data.message)
        }
    }
}