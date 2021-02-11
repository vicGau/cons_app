import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import {
  mockedJwtService,
  mockRoomServiceFindOneParams,
  mockRoomInput,
} from '../../mocks';
import { UsersService } from '../../users/interactors';
import { Rooms } from '../domain/entities';
import { RoomService } from './room.service';

describe('BookingService', () => {
  let service: RoomService;
  let repo: Repository<Rooms>;

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
    repo = module.get<Repository<Rooms>>('RoomsRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FIND ONE - should call findOne method and return a valid result', async () => {
    const repoSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockRoomInput);

    const room: Rooms = await service.findOne(mockRoomServiceFindOneParams);

    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(room).toEqual(mockRoomInput);
  });

  it('FIND ONE - should call findOne method and return a Room not found error', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

    await service.findOne(mockRoomServiceFindOneParams).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'Room not found');
    });

    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('FIND ALL - should call findAllByCompany method and return a valid result', async () => {
    const repoSpy = jest
      .spyOn(repo, 'find')
      .mockResolvedValueOnce([mockRoomInput]);

    const room: Rooms[] = await service.findAllByCompany(1);

    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(room).toEqual([mockRoomInput]);
  });

  it('FIND ALL - should call findAllByCompany method and return a No rooms found error', async () => {
    const repoSpy = jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

    await service.findAllByCompany(1).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'No rooms found');
    });

    expect(repoSpy).toHaveBeenCalledTimes(1);
  });
});
