import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    user.activate();

    await this.repository.save(user);
  }
}
