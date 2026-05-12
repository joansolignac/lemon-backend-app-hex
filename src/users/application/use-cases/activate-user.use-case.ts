import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';

@Injectable()
export class ActivateUserUseCase {
  private readonly logger = new Logger(ActivateUserUseCase.name);

  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    user.activate();

    await this.repository.save(user);

    this.logger.log(
      `User activated: ID=${user.getId().toPrimitives()}, Name=${user.getName().toPrimitives()}, Role=${user.getRole().toPrimitives()}`,
    );
  }
}
