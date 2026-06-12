import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';
import { PaginatedQueryDto } from '../../../../common/dtos/paginated-query.dto';

export class ListSalesQueryDto extends PaginatedQueryDto {
  @ApiPropertyOptional({
    example: 'Juan',
    description:
      'Busca por UUID de venta, nombre de cliente o nombre de vendedor.',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.PENDIENTE,
    description: 'Estado de pago',
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

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
}
