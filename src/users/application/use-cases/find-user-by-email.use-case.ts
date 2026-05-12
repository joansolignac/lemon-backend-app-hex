import { Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';

export class FindUserByEmailUseCase {
  private readonly logger = new Logger(FindUserByEmailUseCase.name);

  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<User | undefined> {
    const userEmail = UserEmail.from(email);

    const user = await this.repository.findByEmail(userEmail);

    if (user) {
      this.logger.log(
        `User found by email: ${user.getEmail().toPrimitives()} -> ID=${user.getId().toPrimitives()}, Name=${user.getName().toPrimitives()}, Role=${user.getRole().toPrimitives()}`,
      );
    } else {
      this.logger.log(`User not found by email: ${email}`);
    }

    return user;
  }
}
