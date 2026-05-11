import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';
import { Injectable } from '@nestjs/common';
import { UserHashedPassword } from '../../domain/value-objects/user-hashed-password.value-object';
import { HashService } from '../../../shared/domain/services/hash.service';

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
    private readonly hashService: HashService,
  ) {}

  async execute(id: string, password: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    const hashedPassword = await this.hashService.hash(password);

    const userHashedPassword = UserHashedPassword.from(hashedPassword);

    user.updatePassword(userHashedPassword);

    await this.repository.save(user);
  }
}
