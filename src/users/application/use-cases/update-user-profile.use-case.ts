import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';
import { UserName } from '../../domain/value-objects/user-name.value-object';
import { UserEmail } from '../../domain/value-objects/user-email.value-object';
import { UserEmailAlreadyExistsException } from '../../domain/exceptions/user-email-already-exists.exception';

@Injectable()
export class UpdateUserProfileUseCase {
  private readonly logger = new Logger(UpdateUserProfileUseCase.name);

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

    if (userEmail) {
      const existsEmail = await this.userFinder.findByEmail(
        userEmail.toPrimitives(),
      );

      if (
        existsEmail &&
        !(existsEmail.getId().toPrimitives() === user.getId().toPrimitives())
      ) {
        throw new UserEmailAlreadyExistsException();
      }
    }

    user.updateProfile({
      name: userName,
      email: userEmail,
    });

    await this.repository.save(user);

    this.logger.log(
      `User profile updated: ID=${user.getId().toPrimitives()}, Updated fields: ${Object.keys(params).join(', ')}`,
    );
  }
}
