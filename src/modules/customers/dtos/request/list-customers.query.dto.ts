import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CustomerStatus } from '@prisma/client';
import { PaginatedQueryDto } from '../../../../common/dtos/paginated-query.dto';

export class ListCustomersQueryDto extends PaginatedQueryDto {
  @ApiPropertyOptional({
    example: 'garcia',
    description: 'Busca en nombre y numero de documento',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: CustomerStatus, example: CustomerStatus.ACTIVE })
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;
}
