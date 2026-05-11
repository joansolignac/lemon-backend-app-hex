import { IsNumber, Max, Min } from 'class-validator';

export class PaginatedQueryDto {
  @IsNumber()
  @Min(1)
  declare readonly page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  declare readonly limit: number;
}
