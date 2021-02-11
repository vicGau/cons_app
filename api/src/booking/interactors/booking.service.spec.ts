import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import {
  mockedJwtService,
  mockBookingInputDto,
  mockBookingServiceFindOneParams,
  mockBookingReturn,
} from '../../mocks';
import { UsersService } from '../../users/interactors';
import { Booking } from '../domain/entities';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  let repo: Repository<Booking>;

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
      providers: [
        BookingService,
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: 'BookingRepository',
          useClass: Repository,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repo = module.get<Repository<Booking>>('BookingRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('CREATE - should call create method and return a valid result', async () => {
    const queryGetRepositorySpyOn = jest
      .spyOn(qr.manager, 'getRepository')
      .mockReturnThis();

    const qrCreateSpyOn = jest.spyOn(qr.manager, 'create').mockReturnThis();
    const qrUpdateSpyOn = jest.spyOn(qr.manager, 'update').mockReturnThis();

    await service.create(mockBookingInputDto);

    expect(queryGetRepositorySpyOn).toHaveBeenCalledTimes(2);
    expect(qrCreateSpyOn).toHaveBeenCalledTimes(1);
    expect(qrUpdateSpyOn).toHaveBeenCalledTimes(1);
  });

  it('FIND ONE - should call findOne method and return a valid result', async () => {
    const repoSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockBookingReturn);

    const booking: Booking = await service.findOne(
      mockBookingServiceFindOneParams,
    );
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(booking).toEqual(mockBookingReturn);
  });

  it('FIND ONE - should call findOne method and return a Booking not found error', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

    await service.findOne(mockBookingServiceFindOneParams).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'Booking not found');
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('FIND ALL - should call findAll method and return a valid result', async () => {
    const repoSpy = jest
      .spyOn(repo, 'find')
      .mockResolvedValueOnce([mockBookingReturn]);

    const booking: Booking[] = await service.findAll();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(booking).toEqual([mockBookingReturn]);
  });

  it('FIND ALL - should call findAll method and return a Booking not found error', async () => {
    const repoSpy = jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

    await service.findAll().catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'No bookings found');
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('DELETE - should call deleteBooking method and return a valid result', async () => {
    const repoSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockBookingReturn);
    const queryGetRepositorySpyOn = jest
      .spyOn(qr.manager, 'getRepository')
      .mockReturnThis();

    const qrDeleteSpyOn = jest.spyOn(qr.manager, 'delete').mockReturnThis();
    const qrUpdateSpyOn = jest.spyOn(qr.manager, 'update').mockReturnThis();

    await service.deleteBooking(1);

    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(queryGetRepositorySpyOn).toHaveBeenCalledTimes(2);
    expect(qrDeleteSpyOn).toHaveBeenCalledTimes(1);
    expect(qrUpdateSpyOn).toHaveBeenCalledTimes(1);
  });

  it('DELETE - should call deleteBooking method and return a No booking found error', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    const queryGetRepositorySpyOn = jest
      .spyOn(qr.manager, 'getRepository')
      .mockReturnThis();

    const qrDeleteSpyOn = jest.spyOn(qr.manager, 'delete').mockReturnThis();
    const qrUpdateSpyOn = jest.spyOn(qr.manager, 'update').mockReturnThis();

    await service.deleteBooking(1).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'No booking found');
    });

    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(queryGetRepositorySpyOn).toHaveBeenCalledTimes(0);
    expect(qrDeleteSpyOn).toHaveBeenCalledTimes(0);
    expect(qrUpdateSpyOn).toHaveBeenCalledTimes(0);
  });
});
