import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class UpdateSaleRequestDto {
  @ApiPropertyOptional({ example: 20.0, description: 'Kilogramos vendidos' })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  declare readonly kilograms?: number;

  @ApiPropertyOptional({ example: 4.0, description: 'Precio por kilogramo' })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  declare readonly pricePerKilogram?: number;

  @ApiPropertyOptional({
    example: 'PAGADO',
    description: 'Estado de pago',
    enum: PaymentStatus,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  declare readonly paymentStatus?: PaymentStatus;
}
