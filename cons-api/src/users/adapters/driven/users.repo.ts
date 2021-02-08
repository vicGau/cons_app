import { Injectable } from "@nestjs/common";
import { IUsersRepo } from "src/users/domain/ports/out/IUsersRepo.interface";
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from "src/users/domain/entities/IUser.interface";

@Injectable()
export class UsersRepo implements IUsersRepo {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: IUser): Promise<void> {
    try {
      await this.usersRepository.create(data);
    } catch (e) {
      console.log(e);
    }
  }
}