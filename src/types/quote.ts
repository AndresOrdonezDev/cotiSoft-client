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
export const quoteResponseSchema = quoteProductsSchema.pick({
    notes:true
}).extend({
  id: z.number(),
  status: z.string(),
  client: z.object({
    id: z.number(),
    fullname: z.string(),
    email: z.string(),
    companyName:z.string(),
    contact:z.string()
  }),
  quoteProducts: z.array(
    z.object({
      id: z.number(),
      product_id: z.number(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number(),
      products: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      }),
    })
  ),
})
export type QuoteProducts = z.infer<typeof quoteProductsSchema>
export type QuoteProductsForm = Pick<QuoteProducts, "client_id"|"notes"|"products"|"total">
