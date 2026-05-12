import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFinderService } from '../services/user-finder.service';
import { UserRole } from '../../domain/value-objects/user-rol.value-object';

@Injectable()
export class UpdateUserRoleUseCase {
  private readonly logger = new Logger(UpdateUserRoleUseCase.name);

  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinderService,
  ) {}

  async execute(id: string, role: string): Promise<void> {
    const user = await this.userFinder.findByIdOrFail(id);

    const useRole = UserRole.from(role);

    user.updateRole(useRole);

    await this.repository.save(user);

    this.logger.log(
      `User role updated: ID=${user.getId().toPrimitives()}, New Role=${role}`,
    );
  }
}
