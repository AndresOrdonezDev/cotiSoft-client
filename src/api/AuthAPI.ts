import { isAxiosError } from "axios";
import api from "../lib/axios";
import { userSchemaAPI, usersSchemaAPI, type ForgotPassword, type FormNewUser, type UpdateUser, type User, type UserLogin } from "../types/auth";

//login
export async function login(formData: UserLogin) {
  try {
    const { data } = await api.post('/auth/login', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error iniciar sesión')
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

//auth CRUD
export async function createAccount(formData: FormNewUser) {
  try {
    const { data } = await api.post('/auth/create-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al crear el usuario')
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
export async function getUserById(id:number) {
  try {
    const {data} = await api(`/auth/user/${id}`)
    const response = userSchemaAPI.safeParse(data)
    if(response.success){
      return response.data
    }
   
  } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data)
            throw new Error(error.response.data.message)
        }
    }
}

type UpdateUserProps ={
  formData:UpdateUser,
  id:User["id"]
}
export async function updateUser({id,formData}:UpdateUserProps) {
  try {
    const {data} = await api.put(`/auth/user/${id}`, formData)
    return data
  } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data)
            throw new Error(error.response.data.message)
        }
    }
}

type UpdatePasswordProps = {
  email:string,
  password:string,
  token:string
}
export async function updatePasswordToken({email,password,token}:UpdatePasswordProps){
  try {
    const {data} = await api.post('/auth/update-password-token', {email,password,token})
    return data  
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al enviar el correo')
  }
}
export async function forgotPassword({email}:ForgotPassword){
  try {
    const {data} = await api.post('/auth/forgot-password', {email})
    return data  
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al enviar el correo')
  }
}

export async function toggleUserStatus(id:User["id"]){
  try {
    const {data} = await api(`/auth/user-status/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
      throw error.response?.data
    }
    throw new Error('Error al actualizar')
  }
}