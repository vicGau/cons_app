import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookingInputDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly roomId: number;
}
