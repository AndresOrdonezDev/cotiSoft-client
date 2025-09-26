import { z } from 'zod'

const quoteSchema = z.object({
    id:z.number(),
    client: z.object({
        fullname: z.string(),
        email: z.string(),
        companyName: z.string(),
        contact: z.string(),
    }),
    client_id:z.number(),
    total:z.number(),
    notes:z.string(),
    status: z.string(),
    createdAt:z.string()
})
export const quoteSchemaAPI = z.array(quoteSchema)
export type Quote = z.infer<typeof quoteSchema>

