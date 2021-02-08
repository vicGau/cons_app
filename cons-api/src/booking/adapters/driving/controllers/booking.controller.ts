import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Booking } from 'src/booking/domain/entities/booking.entity';
import { BookingService } from 'src/booking/interactors/booking.service';
import { BookingInputDto } from '../dtos/BookingInputDto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body(new ValidationPipe()) booking: BookingInputDto): void {
    this.bookingService.create(booking);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Booking> {
    const bookings = await this.bookingService.findOne({ where: { id } });
    return bookings;
  }

  @Get()
  async getAll(): Promise<Booking[]> {
    const bookings = await this.bookingService.findAll();
    return bookings;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.bookingService.deleteBooking(id);
  }
}
