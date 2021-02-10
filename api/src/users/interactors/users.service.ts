import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from '../../booking/domain/entities';
import { UsersInputDto } from '../adapters/dtos/UsersInput.dto';
import { User } from '../domain/entities';
import { IUsersService } from '../domain/ports/in';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    readonly usersRepository: Repository<User>,
  ) {}

  async create(user: UsersInputDto): Promise<void> {
    const userInfo = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (userInfo) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const newUser: User = await this.usersRepository.create(user);

      const company = new Companies();
      company.id = user.companyId;

      newUser.company = company;
      await this.usersRepository.save(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options: object): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['company', 'booking', 'booking.room'],
      ...options,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: ['company'] });

    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
