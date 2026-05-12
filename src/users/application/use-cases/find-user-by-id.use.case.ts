import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserFinderService } from '../services/user-finder.service';

@Injectable()
export class FindUserByIdUseCase {
  private readonly logger = new Logger(FindUserByIdUseCase.name);

  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userFinder.findByIdOrFail(id);

    this.logger.log(
      `User found by ID: ${user.getId().toPrimitives()}, Name=${user.getName().toPrimitives()}, Role=${user.getRole().toPrimitives()}`,
    );

    return user;
  }
}
