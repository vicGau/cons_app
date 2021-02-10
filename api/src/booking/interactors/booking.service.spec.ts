import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { mockedJwtService } from '../../mocks/jwt';
import { UsersService } from '../../users/interactors';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
