import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true, description: 'Lista de resultados' })
  declare readonly data: T[];

  @ApiProperty({
    type: 'object',
    properties: {
      page: { type: 'number', example: 1 },
      limit: { type: 'number', example: 10 },
      total: { type: 'number', example: 100 },
    },
    description: 'Metadatos de paginacion',
  })
  declare readonly meta: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
  };
}
