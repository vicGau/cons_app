import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { JWT_TOKEN, mockedJwtService, mockUserReturn } from './mocks';
import { UsersService } from './users/interactors';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
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

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should call login methods and return a valid result', async () => {
      const serviceSpy = jest.spyOn(authService, 'login').mockReturnValueOnce({
        ...mockUserReturn,
        access_token: JWT_TOKEN,
      });

      const connectedUser = await appController.login(mockUserReturn);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(connectedUser).toEqual({
        ...mockUserReturn,
        access_token: JWT_TOKEN,
      });
    });
  });
});
