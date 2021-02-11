import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from '../../../auth/auth.service';
import { mockedJwtService, mockRoomInput } from '../../../mocks';
import { UsersService } from '../../../users/interactors';
import { Rooms } from '../../domain/entities';
import { RoomService } from '../../interactors';
import { RoomController } from './room.controller';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        AuthService,
        UsersService,
        RoomService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'RoomsRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    roomController = module.get<RoomController>(RoomController);
    roomService = module.get<RoomService>(RoomService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(roomController).toBeDefined();
    });

    it('GET ROOM - should call get method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(roomService, 'findOne')
        .mockResolvedValueOnce(mockRoomInput);

      const room: Rooms = await roomController.get(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(room).toEqual(mockRoomInput);
    });

    it('GET ROOMS - should call getAllByCompanyId method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(roomService, 'findAllByCompany')
        .mockResolvedValueOnce([mockRoomInput]);

      const rooms: Rooms[] = await roomController.getAllByCompanyId(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(rooms).toEqual([mockRoomInput]);
    });
  });
});
