import { Module } from '@nestjs/common';
import { UsersController } from './adapters/driving/users.controller';
import { UsersService } from './interactors/users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
