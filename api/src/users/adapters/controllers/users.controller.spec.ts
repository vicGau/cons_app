import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from '../../../auth/auth.service';
import {
  mockedJwtService,
  mockUserReturn,
  mockUsersInput,
} from '../../../mocks';
import { UsersController } from './users.controller';
import { UsersService } from '../../interactors';
import { User } from '../../../users/domain/entities';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });

    it('CREATE - should call create method and return a valid result', async () => {
      const serviceSpy = jest.spyOn(userService, 'create').mockReturnThis();
      await userController.create(mockUsersInput);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
    });

    it('GET USER - should call getUser method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(mockUserReturn);

      const user: User = await userController.getUser(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(user).toEqual(mockUserReturn);
    });

    it('GET USERS - should call getUsers method and return a valid result', async () => {
      const serviceSpy = jest
        .spyOn(userService, 'findAll')
        .mockResolvedValueOnce([mockUserReturn]);

      const users: User[] = await userController.getUsers();

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(users).toEqual([mockUserReturn]);
    });

    it('DELETE USER - should call getUsers method and return a valid result', async () => {
      const serviceSpy = jest.spyOn(userService, 'deleteUser').mockReturnThis();

      await userController.deleteUser(1);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
