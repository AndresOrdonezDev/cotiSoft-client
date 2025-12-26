import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  identificationType: z.number(),
  fullname: z.string(),
  companyName: z.string().optional(),
  idNumber: z.string(),
  email: z.string(),
  contact: z.string(),
  address: z.string(),
  city: z.string(),
  department: z.string(),
  isActive: z.boolean(),
});

export const clientEmailsSchema = clientSchema.pick({
  id:true,
  email:true
})

export type Client = z.infer<typeof clientSchema>;
export const clientSchemaAPI = z.array(clientSchema);
export const clientEmailsSchemaAPI = z.array(clientEmailsSchema);
export type ClientForm = Pick<Client, "fullname"|"companyName"|"identificationType"|"idNumber"|"contact"|"email"|"address"|"department"|"city">
export type EmailClientList = Pick<Client, "id" | "email"> 