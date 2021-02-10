import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedJwtService } from '../../mocks/jwt';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/interactors';
import { BookingService } from './booking.service';
import { AuthService } from '../../auth/auth.service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
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
          provide: 'RoomsRepository',
          useClass: Repository,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
