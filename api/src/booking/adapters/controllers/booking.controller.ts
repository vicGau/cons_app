import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards';
import { Booking } from '../../domain/entities';
import { BookingService } from '../../interactors';
import { BookingInputDto } from '../dtos/BookingInputDto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) booking: BookingInputDto,
  ): Promise<void> {
    await this.bookingService.create(booking);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Booking> {
    const bookings = await this.bookingService.findOne({ where: { id } });
    return bookings;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Booking[]> {
    const bookings = await this.bookingService.findAll();
    return bookings;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBooking(@Param('id') id: number): Promise<void> {
    await this.bookingService.deleteBooking(id);
  }
}
