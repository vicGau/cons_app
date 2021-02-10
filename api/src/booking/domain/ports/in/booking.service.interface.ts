import { BookingInputDto } from 'src/booking/adapters/dtos/BookingInputDto';
import { Repository } from 'typeorm';
import { Booking, Rooms } from '../../entities';

export interface IBookingService {
  readonly bookingRepository: Repository<Booking>;
  readonly roomRepository: Repository<Rooms>;

  create(booking: BookingInputDto): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  findOne(options: object): Promise<Booking>;
  findAll(): Promise<Booking[]>;
  deleteBooking(id: number): Promise<void>;
}
