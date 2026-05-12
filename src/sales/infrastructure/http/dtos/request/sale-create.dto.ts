import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleCreateDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID del cliente',
  })
  @IsUUID()
  @IsNotEmpty()
  declare readonly customerId: string;

  @ApiProperty({
    example: 15.5,
    description: 'Kilogramos vendidos',
  })
  @IsNumber()
  @Min(0.01)
  declare readonly kilograms: number;

  @ApiProperty({
    example: 3.5,
    description: 'Precio por kilogramo',
  })
  @IsNumber()
  @Min(0.01)
  declare readonly pricePerKilogram: number;
}
