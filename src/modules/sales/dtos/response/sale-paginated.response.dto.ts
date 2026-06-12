import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultResponseDto } from '../../../../common/dtos/paginated-result.response.dto';
import { SaleResponseDto } from './sale.response.dto';

export class SalePaginatedResponseDto extends PaginatedResultResponseDto<SaleResponseDto> {
  @ApiProperty({ type: [SaleResponseDto] })
  declare data: SaleResponseDto[];
}
