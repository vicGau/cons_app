import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { BookingInputDto } from '../adapters/driving/dtos/BookingInputDto';
import { Booking } from '../domain/entities/booking.entity';
import { Rooms } from '../domain/entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options: object): Promise<Rooms> {
    const room = await this.roomRepository.findOne({
      ...options,
      relations: ['company', 'booking'],
    });
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room;
  }

  async findAllByCompany(id: number): Promise<Rooms[]> {
    const rooms = await this.roomRepository.find({
      where: { company: { id } },
      relations: ['company', 'booking'],
      order: {
        id: 'ASC',
      },
    });

    if (!rooms) {
      throw new HttpException('No bookings found', HttpStatus.NOT_FOUND);
    }

    return rooms;
  }
}
