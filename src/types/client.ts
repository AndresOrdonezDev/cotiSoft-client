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

export type Client = z.infer<typeof clientSchema>;
export const clientSchemaAPI = z.array(clientSchema);
export type ClientForm = Pick<Client, "fullname"|"companyName"|"identificationType"|"idNumber"|"contact"|"email"|"address"|"department"|"city">
