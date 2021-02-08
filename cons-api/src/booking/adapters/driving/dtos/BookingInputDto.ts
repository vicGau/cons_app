import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class BookingInputDto {
  @IsDateString()
  @IsNotEmpty()
  readonly startDate: string;

  @IsDateString()
  @IsNotEmpty()
  readonly endDate: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly roomId: number;
}
