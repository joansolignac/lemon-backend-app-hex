import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFinderService {
  constructor(private readonly repository: UserRepository) {}

  async findByIdOrFail(id: string): Promise<User> {
    const userId = UserId.from(id);
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
