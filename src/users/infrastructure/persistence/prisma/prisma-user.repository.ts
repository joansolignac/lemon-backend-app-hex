import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { PrismaService } from '../../../../shared/infrastructure/persistence/prisma/services/prisma.service';
import { PaginatedParams } from 'src/shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from 'src/shared/domain/value-objects/paginated-result.value-object';
import { User } from 'src/users/domain/entities/user.entity';
import { UserEmail } from 'src/users/domain/value-objects/user-email.value-object';
import { UserId } from 'src/users/domain/value-objects/user-id.value-object';
import { toUserDomain, toUsersDomainList } from './mapper/user-domain.mapper';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async save(user: User): Promise<void> {
    const USER_ID = user.getId();
    const USER_DATA = {
      id: USER_ID,
      role: user.getRole(),
      name: user.getName(),
      email: user.getEmail(),
      hashedPassword: user.getHashedPassword(),
      status: user.getStatus(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
    await this.prisma.user.upsert({
      where: { id: USER_ID },
      update: USER_DATA,
      create: USER_DATA,
    });
  }

  async findById(id: UserId): Promise<User | undefined> {
    const USER_ID = id.toPrimitives();

    const user = await this.prisma.user.findUnique({
      where: { id: USER_ID },
    });

    return user ? toUserDomain(user) : undefined;
  }

  async findByEmail(email: UserEmail): Promise<User | undefined> {
    const USER_EMAIL = email.toPrimitives();

    const user = await this.prisma.user.findUnique({
      where: { email: USER_EMAIL },
    });

    return user ? toUserDomain(user) : undefined;
  }

  async getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<User>> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.user.count(),
    ]);

    const users = toUsersDomainList(data);

    return PaginatedResult.generate<User>(params, users, total);
  }
}
