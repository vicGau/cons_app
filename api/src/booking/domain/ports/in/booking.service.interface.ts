import { BookingInputDto } from 'src/booking/adapters/dtos/BookingInputDto';
import { Connection, Repository } from 'typeorm';
import { Booking } from '../../entities';

export interface IBookingService {
  readonly bookingRepository: Repository<Booking>;
  readonly connection: Connection;

  create(booking: BookingInputDto): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  findOne(options: object): Promise<Booking>;
  findAll(): Promise<Booking[]>;
  deleteBooking(id: number): Promise<void>;
}
