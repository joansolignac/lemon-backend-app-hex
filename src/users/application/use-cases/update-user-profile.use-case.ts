import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';
import { UserName } from '../../domain/value-objects/user-name.value-object';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(
    id: string,
    params: { name?: string; email?: string },
  ): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    const userName = params.name ? UserName.from(params.name) : undefined;
    const userEmail = params.email ? UserEmail.from(params.email) : undefined;

    user.updateProfile({ name: userName, email: userEmail });

    await this.repository.save(user);
  }
}
