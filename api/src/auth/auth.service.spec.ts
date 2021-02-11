import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedJwtService } from '../mocks/jwt';
import { Repository } from 'typeorm';
import { UsersService } from '../users/interactors';
import { AuthService } from './auth.service';
import { User } from '../users/domain/entities';
import { JWT_TOKEN, mockUserRepoFindOne, mockUserReturn } from '../mocks';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockReturnValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call validateUser methods and return a valid result', async () => {
    const serviceSpy = jest.spyOn(userService, 'findOne');

    const repoSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockUserRepoFindOne);

    const email = 'test@test.com';
    const password = 'password';
    const { hashPassword, ...user } = await service.validateUser(
      email,
      password,
    );

    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith({ where: { email } });
    expect(user).toEqual(mockUserReturn);
  });

  it('should call login methods and return a valid result', async () => {
    const connectedUser = await service.login(mockUserReturn);

    expect(connectedUser).toEqual({
      ...mockUserReturn,
      access_token: JWT_TOKEN,
    });
  });
});
