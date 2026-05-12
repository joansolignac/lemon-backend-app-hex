import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';

@Injectable()
export class DeactivateUserUseCase {
  private readonly logger = new Logger(DeactivateUserUseCase.name);

  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    user.deactivate();

    await this.repository.save(user);

    this.logger.log(
      `User deactivated: ID=${user.getId().toPrimitives()}, Name=${user.getName().toPrimitives()}, Role=${user.getRole().toPrimitives()}`,
    );
  }
}
