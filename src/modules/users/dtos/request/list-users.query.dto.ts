import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { PaginatedQueryDto } from '../../../../common/dtos/paginated-query.dto';

export class ListUsersQueryDto extends PaginatedQueryDto {
  @ApiPropertyOptional({
    example: 'admin',
    description: 'Busca en nombre y email',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: UserStatus, example: UserStatus.ACTIVE })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
