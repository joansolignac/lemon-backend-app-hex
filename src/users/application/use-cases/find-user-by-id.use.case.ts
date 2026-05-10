import { UserRepository } from '../../domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserFinderService } from '../services/user-finder.service';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<User> {
    return this.userFinder.findByIdOrFail(id);
  }
}
