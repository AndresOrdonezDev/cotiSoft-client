import { isAxiosError } from "axios";
import api from "../lib/axios";
import { attachmentSchema, attachmentSchemaAPI, type Attachment, type AttachmentForm } from "../types/attachment";

export async function createAttachment(formData: AttachmentForm) {
    try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('attachmentType', formData.attachmentType.toString());
        if (formData.file) {
            data.append('file', formData.file);
        }

        const { data: responseData } = await api.post('/quote-attachment', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return responseData;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
            throw error.response?.data;
        }
        throw new Error('Error al crear el adjunto');
    }
}

type getAttachmentsProps = {
    isActive: number;
}

export async function getAttachments({ isActive}: getAttachmentsProps) {
    try {
        const { data } = await api(`/quote-attachment?isActive=${isActive}`);
        const result = attachmentSchemaAPI.safeParse(data);
        if (result.success) {
            return result.data;
        }
        throw new Error('Error al consultar adjuntos');
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error);
            throw error;
        }
        throw new Error('Error al consultar adjuntos');
    }
}

export async function getAttachmentById(id: Attachment['id']) {
    try {
        const { data } = await api(`/quote-attachment/${id}`);
        const result = attachmentSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
        throw Error('Error al consultar el adjunto');
    } catch (error) {
        if (isAxiosError(error)) {
            throw error;
        }
        throw new Error('Error al consultar adjunto');
    }
}

type updateAttachmentProps = {
    id: Attachment['id'];
    formData: AttachmentForm;
}

export async function updateAttachment({ id, formData }: updateAttachmentProps) {
    try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('attachmentType', formData.attachmentType.toString());
        if (formData.file) {
            data.append('file', formData.file);
        }

        const { data: responseData } = await api.put(`/quote-attachment/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return responseData;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
            throw error.response?.data;
        }
        throw new Error('Error al actualizar el adjunto');
    }
}

export async function toggleAttachmentActive(id: Attachment['id']) {
    try {
        const { data } = await api.post(`/quote-attachment/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
            throw error.response?.data;
        }
        throw new Error('Error al actualizar el adjunto');
    }
}