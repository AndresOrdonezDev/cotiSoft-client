import { z } from "zod";

export const attachmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  attachmentType: z.number(), // 1: Producto, 2: Servicio, 3: Productos y Servicios
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const attachmentSchemaAPI = z.array(attachmentSchema);
export type Attachment = z.infer<typeof attachmentSchema>;
export type AttachmentForm = Pick<Attachment, "name" | "attachmentType"> & {
  file: File | null;
};