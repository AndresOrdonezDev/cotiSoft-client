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

const quoteProductsSchema = z.object({
    client_id:z.number(),
    notes:z.string(),
    total:z.number(),
    products:z.array(
        z.object({
            product_id:z.number(),
            price:z.number(),
            quantity:z.number(),
            tax:z.number()
        })
    )
})
export type QuoteProducts = z.infer<typeof quoteProductsSchema>
export type QuoteProductsForm = Pick<QuoteProducts, "client_id"|"notes"|"products"|"total">
