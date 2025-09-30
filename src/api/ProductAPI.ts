import { isAxiosError } from "axios";
import api from "../lib/axios";
import { productSchema, productSchemaAPI, type Product, type ProductForm } from "../types/product";

export async function createProduct(formData:ProductForm){
    try {
        const { data } = await api.post('/product', formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            throw error.response?.data
        }
        throw new Error('Error al crear el producto')
    }
}
type getProductsProps = {
  isActive: number
  search: string
}
export async function getProducts({isActive,search}:getProductsProps) {
    try {
        const { data } = await api(`/product?isActive=${isActive}&search=${encodeURIComponent(search)}`)
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

export async function getProductById(id: Product['id']) {
    try {
        const { data } = await api(`/product/${id}`)
        const result = productSchema.safeParse(data)
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

type updateProductProps = {
    id: Product['id'],
    formData: ProductForm
}
export async function updateProduct({ id, formData }: updateProductProps) {
    try {
        const { data } = await api.put(`/product/${id}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            throw error.response?.data
        }
        throw new Error('Error al actualizar el producto')
    }
}

export async function toggleProductActive(id: Product['id']) {
    try {
        const { data } = await api.post(`/product/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            throw error.response?.data
        }
        throw new Error('Error al actualizar el cliente')
    }
}