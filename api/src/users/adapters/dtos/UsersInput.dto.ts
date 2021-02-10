import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class UsersInputDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly companyId: number;

  @IsOptional()
  readonly createdAt?: Date;

  @IsOptional()
  readonly updatedAt?: Date;
}
