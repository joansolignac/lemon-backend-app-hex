import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  declare readonly role: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  declare readonly password: string;
}
