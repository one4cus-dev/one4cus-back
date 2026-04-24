// src\modules\users\users.schema.ts
import {z} from "zod";
import {USER_ROLE_VALUES} from "../../common/constants/index.js";

export const createUserBodySchema = z.object({
    authUserId:z.string().uuid().optional(),
    email:z.string().email().optional(),
    phone:z.string().min(5).max(30).optional(),
    fullName:z.string().min(2).max(255),
    avatarUrl:z.string().url().optional(),
    roles:z.array(z.enum(USER_ROLE_VALUES as [string, ...string[]])).optional(),
});

export const userParamsSchema = z.object({
    id:z.string().uuid(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export type UserParams = z.infer<typeof userParamsSchema>;