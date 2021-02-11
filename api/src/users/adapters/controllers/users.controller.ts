import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../../../users/domain/entities/user.entity';
import { UsersService } from '../../interactors/users.service';
import { UsersInputDto } from '../dtos/UsersInput.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) user: UsersInputDto): Promise<void> {
    await this.usersService.create(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne({
      where: { id },
    });
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(parseInt(id));
  }
}