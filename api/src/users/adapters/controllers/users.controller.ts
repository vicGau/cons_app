import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards';
import { User } from '../../../users/domain/entities/user.entity';
import { UsersService } from '../../interactors/users.service';
import { UsersInputDto } from '../dtos/UsersInput.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create a user
   * @param {UsersInputDto} user User object
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) user: UsersInputDto): Promise<void> {
    await this.usersService.create(user);
  }

  /**
   * Endpoint to get user informations
   * @param {number} id User ID
   * @returns {User} User informations
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne({
      where: { id },
    });
    return user;
  }

  /**
   * Endpoint to get all users
   * @returns {User[]} Users array
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  /**
   * Endpoint to delete a user
   * @param {number} id User ID
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
