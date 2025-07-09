import { z } from 'zod'

// Using isActive boolean instead of status string
export type UserStatus = 'active' | 'inactive'

const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('editor'),
  z.literal('user'),
])

const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: userRoleSchema,
  permissions: z.array(z.string()),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
