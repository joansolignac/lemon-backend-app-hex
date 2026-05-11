import { Prisma } from '@prisma/client';
import { User } from '../../../../domain/entities/user.entity';
import { UserId } from '../../../../domain/value-objects/user-id.value-object';
import { UserRole } from '../../../../domain/value-objects/user-rol.value-object';
import { UserName } from '../../../../domain/value-objects/user-name.value-object';
import { UserEmail } from '../../../../domain/value-objects/user-email.value-object';
import { UserHashedPassword } from '../../../../domain/value-objects/user-hashed-password.value-object';
import { UserStatus } from '../../../../domain/value-objects/user-status.value-object';

export type PrismaUser = Prisma.UserGetPayload<Record<string, never>>;

export const toUserDomain = (user: PrismaUser): User => {
  const userId = UserId.from(user.id);
  const userRole = UserRole.from(user.role);
  const userName = UserName.from(user.name);
  const userEmail = UserEmail.from(user.email);
  const userHashedPassword = UserHashedPassword.from(user.hashedPassword);
  const userStatus = UserStatus.from(user.status);
  const createdAt = user.createdAt;
  const updatedAt = user.updatedAt;

  return User.from(
    userId,
    userRole,
    userName,
    userEmail,
    userHashedPassword,
    userStatus,
    createdAt,
    updatedAt,
  );
};

export const toUsersDomainList = (users: PrismaUser[]): User[] => {
  return users.map(toUserDomain);
};
