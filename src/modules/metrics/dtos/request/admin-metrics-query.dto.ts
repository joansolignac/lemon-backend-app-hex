import { IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MetricsQueryDto } from './metrics-query.dto';

export class AdminMetricsQueryDto extends MetricsQueryDto {
  @ApiPropertyOptional({
    example: 5,
    description: 'Cantidad de vendedores en el ranking (3, 4 o 5). Default: 5.',
    enum: [3, 4, 5],
  })
  @IsOptional()
  @IsIn([3, 4, 5])
  @Type(() => Number)
  topSellers?: 3 | 4 | 5;
}
