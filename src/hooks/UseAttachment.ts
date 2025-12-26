import { useQuery } from "@tanstack/react-query";
import { getAttachmentById, getAttachments } from "../api/AttachmentAPI";
import type { Attachment } from "../types/attachment";

export const useAttachments = (isActive: number) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['attachments', isActive],
        queryFn: () => getAttachments({ isActive }),
        retry: false,
        refetchOnWindowFocus: false
    });
    return { data, isError, isLoading };
};

export const useAttachmentById = (id: Attachment["id"]) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['attachment', id],
        queryFn: () => getAttachmentById(id),
        retry: false,
        refetchOnWindowFocus: false
    });
    return { data, isError, isLoading };
};