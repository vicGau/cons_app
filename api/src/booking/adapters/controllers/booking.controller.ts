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

  /**
   * Endpoint to create a booking record
   * @param {BookingInputDto} booking Booking needed infos
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) booking: BookingInputDto,
  ): Promise<void> {
    await this.bookingService.create(booking);
  }

  /**
   * Endpoint to get information about one booking
   * @param {number} id Booking ID
   * @returns {Booking} Booking infos object
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Booking> {
    const booking = await this.bookingService.findOne({ where: { id } });
    return booking;
  }

  /**
   * Endpoint to get all booking
   * @returns {Booking[]} Bookings array
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Booking[]> {
    const bookings = await this.bookingService.findAll();
    return bookings;
  }

  /**
   * Endpoint to delete a booking
   * @param {number} id Booking ID
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBooking(@Param('id') id: number): Promise<void> {
    await this.bookingService.deleteBooking(id);
  }
}
