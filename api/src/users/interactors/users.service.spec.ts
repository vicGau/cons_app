import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockedJwtService,
  mockUserRepo,
  mockUserRepoFindOne,
  mockUserReturn,
  mockUserServiceFindOneParams,
  mockUsersInput,
} from '../../mocks';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from './users.service';
import { User } from '../domain/entities';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
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

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('CREATE - should call create method and return a valid result', async () => {
    const repoSpyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(null);
    const repoSpyCreate = jest.spyOn(repo, 'create').mockReturnThis();
    const repoSpySave = jest.spyOn(repo, 'save').mockReturnThis();

    await service.create(mockUsersInput);

    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
    expect(repoSpyCreate).toHaveBeenCalledTimes(1);
    expect(repoSpySave).toHaveBeenCalledTimes(1);
  });

  it('CREATE - should create method and return users already exists error', async () => {
    const repoSpyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockUserReturn);
    const repoSpyCreate = jest.spyOn(repo, 'create').mockReturnThis();
    const repoSpySave = jest.spyOn(repo, 'save').mockReturnThis();

    await service.create(mockUsersInput).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'User already exists');
    });
    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
    expect(repoSpyCreate).toHaveBeenCalledTimes(0);
    expect(repoSpySave).toHaveBeenCalledTimes(0);
  });

  it('FIND ONE - should call findOne method and return a valid result', async () => {
    const repoSpyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(mockUserReturn);

    const user: User = await service.findOne(mockUserServiceFindOneParams);

    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual(mockUserReturn);
  });

  it('FIND ONE - should call findOne method and return a User not found error', async () => {
    const repoSpyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(null);

    await service.findOne(mockUserServiceFindOneParams).catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'User not found');
    });
    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
  });

  it('FIND ALL - should call findAll method and return a valid result', async () => {
    const repoSpyFindOne = jest
      .spyOn(repo, 'find')
      .mockResolvedValueOnce([mockUserReturn]);

    const user: User[] = await service.findAll();

    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual([mockUserReturn]);
  });

  it('FIND ALL - should call findAll method and return a Users not found error', async () => {
    const repoSpyFindOne = jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

    await service.findAll().catch((e) => {
      expect(e).toBeInstanceOf(HttpException);
      expect(e).toHaveProperty('message', 'Users not found');
    });
    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
  });

  it('DELETE - should call delete method and return a valid result', async () => {
    const repoSpyFindOne = jest.spyOn(repo, 'delete').mockReturnThis();

    await service.deleteUser(1);
    expect(repoSpyFindOne).toHaveBeenCalledTimes(1);
  });
});
