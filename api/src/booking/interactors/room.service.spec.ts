import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { mockedJwtService } from '../../mocks/jwt';
import { UsersService } from '../../users/interactors';
import { RoomService } from './room.service';

describe('BookingService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
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

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
