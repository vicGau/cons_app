import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { AuthService } from '../../../auth/auth.service';
import { BookingController } from './booking.controller';
import {
  mockBookingInputDto,
  mockBookingReturn,
  mockedJwtService,
} from '../../../mocks';
import { UsersService } from '../../../users/interactors';
import { BookingService } from '../../interactors';
import { Booking } from '../../domain/entities';

describe('BookingController', () => {
  let bookingController: BookingController;
  let bookingService: BookingService;

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(): QueryRunner {
      return qr;
    }
  }
  beforeEach(async () => {
    Object.assign(qr.manager, {
      save: jest.fn(),
      create: jest.fn(),
      getRepository: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        AuthService,
        UsersService,
        BookingService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'BookingRepository',
          useClass: Repository,
        },
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
      ],
    }).compile();

    bookingController = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(bookingController).toBeDefined();
    });

    it('CREATE - should call create method and return a valid result', async () => {
      const serviceSpy = jest.spyOn(bookingService, 'create').mockReturnThis();
      await bookingController.create(mockBookingInputDto);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
    });

    it('GET BOOKING - should call get method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(bookingService, 'findOne')
        .mockResolvedValueOnce(mockBookingReturn);

      const booking: Booking = await bookingController.get(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(booking).toEqual(mockBookingReturn);
    });

    it('GET BOOKINGS - should call getAll method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(bookingService, 'findAll')
        .mockResolvedValueOnce([mockBookingReturn]);

      const bookings: Booking[] = await bookingController.getAll();

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(bookings).toEqual([mockBookingReturn]);
    });

    it('DELETE BOOKING - should call deleteBooking method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(bookingService, 'deleteBooking')
        .mockReturnThis();

      await bookingController.deleteBooking(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
