import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController, RoomController } from './adapters/controllers';
import { Booking, Rooms } from './domain/entities';
import { BookingService, RoomService } from './interactors';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Rooms])],
  controllers: [BookingController, RoomController],
  providers: [BookingService, RoomService],
})
export class BookingModule {}
