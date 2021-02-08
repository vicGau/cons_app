import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepo } from '../adapters/driven/users.repo';
import { IUser } from '../domain/entities/IUser.interface';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepo,
  ) {}

  async create(user: IUser): Promise<void> {
    await this.usersRepository.create(user);
  }
}