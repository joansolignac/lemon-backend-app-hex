import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MetricsQueryDto {
  @ApiPropertyOptional({
    example: '2025-06-11',
    description:
      'Fecha exacta (YYYY-MM-DD). Excluye los demás filtros de fecha.',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    example: '2025-01-01',
    description:
      'Inicio del rango de fechas (YYYY-MM-DD). Usar junto con endDate.',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2025-06-30',
    description:
      'Fin del rango de fechas (YYYY-MM-DD). Usar junto con startDate.',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: 6,
    description: 'Mes (1-12). Usar junto con year.',
    minimum: 1,
    maximum: 12,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month?: number;

  @ApiPropertyOptional({
    example: 2025,
    description: 'Año (>= 2000). Puede usarse solo o junto con month.',
    minimum: 2000,
  })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Type(() => Number)
  year?: number;

  @ApiPropertyOptional({
    example: 5,
    description:
      'Cantidad de clientes en el ranking (3, 4 o 5). Solo para top-customers.',
    enum: [3, 4, 5],
  })
  @IsOptional()
  @IsIn([3, 4, 5])
  @Type(() => Number)
  top?: 3 | 4 | 5;
}
