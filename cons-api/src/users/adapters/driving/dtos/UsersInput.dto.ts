import { IsString, IsOptional, IsNotEmpty, IsBoolean} from 'class-validator';

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

    @IsOptional()
    readonly createdAt?: Date;

    @IsOptional()
    readonly updatedAt?: Date;
}