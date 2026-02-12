import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  password: z.string(),
  confirmPassword:z.string(),
  email: z.string(),
  username: z.string(),
  isAdmin: z.coerce.boolean(),
  isActive: z.coerce.boolean(),
});

export type User = z.infer<typeof userSchema>;
export const userSchemaAPI = userSchema.pick({
  id:true,
  username:true,
  email:true,
  isAdmin:true,
  isActive:true
});
export const usersSchemaAPI = z.array(userSchemaAPI)
export type FormNewUser = Pick<User, "username"|"email"|"password"|"isAdmin"|"confirmPassword">
export type UserLogin = Pick<User, "email"|"password">
export type ForgotPassword = Pick<User, "email">
export type UpdateUser = Pick<User, "username"|"email"|"isAdmin" >
export type UpdatePassword = Pick<User,"password" | "confirmPassword" >