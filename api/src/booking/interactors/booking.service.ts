import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { BookingInputDto } from '../adapters/driving/dtos/BookingInputDto';
import { Booking } from '../domain/entities/booking.entity';
import { Rooms } from '../domain/entities/room.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
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
    await this.bookingRepository.delete(id);
  }
}
