import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './adapters/driving/controllers/booking.controller';
import { Booking } from './domain/entities/booking.entity';
import { BookingService } from './interactors/booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
