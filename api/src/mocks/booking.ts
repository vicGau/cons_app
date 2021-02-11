import { BookingInputDto } from '../booking/adapters/dtos/BookingInputDto';
import { Booking } from '../booking/domain/entities';

export const mockBookingInputDto: BookingInputDto = {
  description: 'description',
  userId: 1,
  roomId: 1,
};

export const mockBookingReturn: Booking = {
  id: 1,
  user: null,
  description: 'description',
  room: { id: 1, name: '', available: true, company: null, booking: null },
  checkBooking: jest.fn().mockResolvedValue(true),
  isUserAuthorized: jest.fn().mockResolvedValue(true),
};

export const mockBookingServiceFindOneParams = {
  where: { id: 1 },
};