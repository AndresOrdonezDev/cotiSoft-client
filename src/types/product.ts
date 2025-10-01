import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  tax: z.number(),
  productType: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const productSchemaAPI = z.array(productSchema);
export type Product = z.infer<typeof productSchema>;
export type ProductForm = Pick<Product, "name"|"description"|"price"|"tax"|"productType"|"stock">

//to quote
const ProductQuoteSchema = productSchema.pick({
  name: true,
  description: true,
  price:true,
  tax: true
}).extend({
  quantity:z.number(),
  product_id:z.number()
})
export type ProductQuote = z.infer<typeof ProductQuoteSchema>