import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../http/dtos/response/user-response.dto';

export const toUserResponse = (user: User): UserResponseDto => ({
  id: user.getId().toPrimitives(),
  role: user.getRole().toPrimitives(),
  name: user.getName().toPrimitives(),
  email: user.getEmail().toPrimitives(),
  status: user.getStatus().toPrimitives(),
  createdAt: user.getCreatedAt().toISOString(),
  updatedAt: user.getUpdatedAt().toISOString(),
});
