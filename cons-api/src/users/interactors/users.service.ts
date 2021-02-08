import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersInputDto } from '../adapters/driving/dtos/UsersInput.dto';
import { IUser } from '../domain/entities/IUser.interface';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: UsersInputDto): Promise<void> {
    const userInfo = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userInfo) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const newUser: User = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
    }
    catch(e) {
      throw new Error(e);
    }
  }

  async findOne(options: object): Promise<IUser> {
    const user = await this.usersRepository.findOne(options);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.usersRepository.find();
    
    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}