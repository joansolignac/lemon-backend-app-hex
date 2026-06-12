import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Numero de pagina',
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  declare readonly page: number;

  @ApiProperty({
    example: 10,
    description: 'Cantidad de elementos por pagina',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsNumber()
  @Min(1)
  @Max(100)
  declare readonly limit: number;
}
