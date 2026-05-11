import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  declare readonly password: string;
}
