import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/response/user-response.dto';

export const toUserResponse = (user: User): UserResponseDto => ({
  id: user.getId(),
  role: user.getRole(),
  name: user.getName(),
  email: user.getEmail(),
  status: user.getStatus(),
  createdAt: user.getCreatedAt().toISOString(),
  updatedAt: user.getUpdatedAt().toISOString(),
});
