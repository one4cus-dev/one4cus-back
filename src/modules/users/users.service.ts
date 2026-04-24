// src\modules\users\users.service.ts
import { AppError } from "../../common/errors/app-error.js";
import { USER_ROLES } from "../../common/constants/index.js";
import type { CreateUserBody } from "./users.schema.js";
import * as usersRepository from "./users.repository.js";

export async function createUser(input: CreateUserBody) {
  const user = await usersRepository.createUser({
    authUserId: input.authUserId,
    email: input.email,
    phone: input.phone,
    fullName: input.fullName,
    avatarUrl: input.avatarUrl,
  });

  const roles = input.roles?.length ? input.roles : [USER_ROLES.PROVIDER];

  await usersRepository.createUserRoles(user.id, roles);

  return getUserById(user.id);
}

export async function getUserById(id: string) {
  const user = await usersRepository.findUserById(id);

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  const roles = await usersRepository.findUserRoles(id);

  return {
    ...user,
    roles: roles.map((item) => item.role),
  };
}

export async function listUsers() {
  const users = await usersRepository.listUsers();

  return await Promise.all(
    users.map(async (user) => {
      const roles = await usersRepository.findUserRoles(user.id);

      return {
        ...user,
        roles: roles.map((item) => item.role),
      };
    })
  );
}