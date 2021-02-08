import { Controller, Get, Post } from '@nestjs/common';
import { IUser } from 'src/users/domain/entities/IUser.interface';
import { UsersService } from '../../interactors/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return 'Hello world'
  }

  @Post()
  create(user: IUser): void {
    this.usersService.create(user);
  }
}
