import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { User } from '../../../users/domain/entities/user.entity';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';
import { HashService } from '../../../shared/domain/services/hash.service';
import { UserInactiveException } from '../../../users/domain/exceptions/user-inactive.exception';

@Injectable()
export class ValidateCredentialsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    const userEmail = UserEmail.from(email);

    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!user.getStatus().isActive()) {
      throw new UserInactiveException();
    }

    const hashedPassword = user.getHashedPassword().toPrimitives();

    await this.validatePassword(password, hashedPassword);

    return user;
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isCorrectPassword = await this.hashService.compare(
      password,
      hashedPassword,
    );

    if (!isCorrectPassword) {
      throw new InvalidCredentialsException();
    }
  }
}
