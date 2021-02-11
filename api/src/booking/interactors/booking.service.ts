import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/domain/entities';
import { Connection, Repository } from 'typeorm';
import { BookingInputDto } from '../adapters/dtos/BookingInputDto';
import { Booking, Rooms } from '../domain/entities';
import { IBookingService } from '../domain/ports/in';

@Injectable()
export class BookingService implements IBookingService {
  constructor(
    @InjectRepository(Booking)
    readonly bookingRepository: Repository<Booking>,
    readonly connection: Connection,
  ) {}

  /**
   * Method to create a booking
   * @param {BookingInputDto} booking Booking infos
   */
  async create(booking: BookingInputDto): Promise<void> {
    // Create a query runner to perform a database transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // Start database transaction
    await queryRunner.startTransaction();

    try {
      const bookingRepository = queryRunner.manager.getRepository<Booking>(
        'booking',
      );
      const newBooking: Booking = await bookingRepository.create(booking);
      const user = new User();
      user.id = booking.userId;

      const room = new Rooms();
      room.id = booking.roomId;

      newBooking.user = user;
      newBooking.room = room;

      await queryRunner.manager.save(newBooking);
      const roomsRepository = queryRunner.manager.getRepository<Rooms>('rooms');

      await roomsRepository.update(booking.roomId, { available: false });

      // Commit transaction if success
      await queryRunner.commitTransaction();
    } catch (e) {
      // Rollback transaction if failed
      await queryRunner.rollbackTransaction();
      throw new Error(e);
    } finally {
      // Release the connection
      await queryRunner.release();
    }
  }

  /**
   * Method to get booking informations
   * @param {object} options TypeORM query object
   * @returns {Booking} Booking informations
   */
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

  /**
   * Method to get all bookings
   * @returns {Booking[]} Bookings array
   */
  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['user', 'room'],
    });

    if (!bookings) {
      throw new HttpException('No bookings found', HttpStatus.NOT_FOUND);
    }

    return bookings;
  }

  /**
   * Method to delete a booking
   * @param {number} id Booking ID
   */
  async deleteBooking(id: number): Promise<void> {
    // Check if booking ID exists in the database
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      throw new HttpException('No booking found', HttpStatus.NOT_FOUND);
    }

    // Create a query runner to perform a database transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // Start database transaction
    await queryRunner.startTransaction();

    try {
      const bookingRepository = queryRunner.manager.getRepository<Booking>(
        'booking',
      );
      await bookingRepository.delete(id);

      const roomsRepository = queryRunner.manager.getRepository<Rooms>('rooms');
      await roomsRepository.update(booking.room.id, { available: true });

      // Commit transaction if success
      await queryRunner.commitTransaction();
    } catch (e) {
      // Rollback transaction if failed
      await queryRunner.rollbackTransaction();
      throw new Error(e);
    } finally {
      // Release the connection
      await queryRunner.release();
    }
  }
}
