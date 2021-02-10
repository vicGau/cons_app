import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/domain/entities';
import { Repository } from 'typeorm';
import { BookingInputDto } from '../adapters/dtos/BookingInputDto';
import { Booking, Rooms } from '../domain/entities';
import { IBookingService } from '../domain/ports/in';

@Injectable()
export class BookingService implements IBookingService {
  constructor(
    @InjectRepository(Booking)
    readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Rooms)
    readonly roomRepository: Repository<Rooms>,
  ) {}

  async create(booking: BookingInputDto): Promise<void> {
    try {
      const newBooking: Booking = await this.bookingRepository.create(booking);
      const user = new User();
      user.id = booking.userId;

      const room = new Rooms();
      room.id = booking.roomId;

      newBooking.user = user;
      newBooking.room = room;

      await this.bookingRepository.save(newBooking);
      await this.roomRepository.update(booking.roomId, { available: false });
    } catch (e) {
      throw new Error(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options: object): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      ...options,
      relations: ['user', 'room'],
    });
    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }

    return booking;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['user', 'room'],
    });

    if (!bookings) {
      throw new HttpException('No bookings found', HttpStatus.NOT_FOUND);
    }

    return bookings;
  }

  async deleteBooking(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      throw new HttpException('No booking found', HttpStatus.NOT_FOUND);
    }

    await this.bookingRepository.delete(id);
    await this.roomRepository.update(booking.room.id, { available: true });
  }
}
