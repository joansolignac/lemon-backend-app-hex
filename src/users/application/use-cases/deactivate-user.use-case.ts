import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';

@Injectable()
export class DeactivateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    user.deactivate();

    await this.repository.save(user);
  }
}
