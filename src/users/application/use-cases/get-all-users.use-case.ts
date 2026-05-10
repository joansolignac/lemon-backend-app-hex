import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}
