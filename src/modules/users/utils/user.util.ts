import { PrismaService } from '../../../prisma/prisma.service';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

export async function ensureUserById(prisma: PrismaService, id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new UserNotFoundException();
  return user;
}

export async function ensureUserByEmail(prisma: PrismaService, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new UserNotFoundException();
  return user;
}
