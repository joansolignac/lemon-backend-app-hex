import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultResponseDto } from '../../../../common/dtos/paginated-result.response.dto';
import { UserResponseDto } from './user.response.dto';

export class UserPaginatedResponseDto extends PaginatedResultResponseDto<UserResponseDto> {
  @ApiProperty({ type: [UserResponseDto] })
  declare data: UserResponseDto[];
}
