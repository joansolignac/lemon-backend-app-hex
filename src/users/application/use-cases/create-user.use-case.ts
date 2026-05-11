import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';
import { UserEmailAlreadyExistsException } from '../../domain/exceptions/user-email-already-exists.exception';
import { HashService } from '../../../shared/domain/services/hash.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(params: {
    role: string;
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    const userEmail = UserEmail.from(params.email);

    const existingUser = await this.repository.findByEmail(userEmail);

    if (existingUser) {
      throw new UserEmailAlreadyExistsException();
    }

    const hashedPassword = await this.hashService.hash(params.password);

    const user = User.create({
      role: params.role,
      name: params.name,
      email: params.email,
      hashedPassword,
    });

    await this.repository.save(user);
  }
}
