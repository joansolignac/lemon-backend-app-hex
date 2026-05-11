import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';

export class FindUserFyEmailUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<User | undefined> {
    const userEmail = UserEmail.from(email);

    return await this.repository.findByEmail(userEmail);
  }
}
