import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { IUser } from 'src/users/domain/entities/IUser.interface';
import { UsersService } from '../../../interactors/users.service';
import { UsersInputDto } from '../dtos/UsersInput.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create( @Body(new ValidationPipe()) user:  UsersInputDto): void {
    this.usersService.create(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    const user = await this.usersService.findOneById(parseInt(id));
    return user;
  }

  @Get()
  async getUsers(): Promise<IUser[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(parseInt(id));
  }
}
