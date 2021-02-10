import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedJwtService } from '../../mocks/jwt';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
