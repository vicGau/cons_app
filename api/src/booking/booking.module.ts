import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './adapters/driving/controllers/booking.controller';
import { RoomController } from './adapters/driving/controllers/room.controller';
import { Booking } from './domain/entities/booking.entity';
import { Rooms } from './domain/entities/room.entity';
import { BookingService } from './interactors/booking.service';
import { RoomService } from './interactors/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Rooms])],
  controllers: [BookingController, RoomController],
  providers: [BookingService, RoomService],
})
export class BookingModule {}
