import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultResponseDto } from '../../../../common/dtos/paginated-result.response.dto';
import { CustomerResponseDto } from './customer.response.dto';

export class CustomerPaginatedResponseDto extends PaginatedResultResponseDto<CustomerResponseDto> {
  @ApiProperty({ type: [CustomerResponseDto] })
  declare data: CustomerResponseDto[];
}
