import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';

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

  async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = UserEmail.from(email);
    return this.repository.findByEmail(userEmail);
  }
}
