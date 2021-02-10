import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../domain/entities';
import { IRoomService } from '../domain/ports/in';

@Injectable()
export class RoomService implements IRoomService {
  constructor(
    @InjectRepository(Rooms)
    readonly roomRepository: Repository<Rooms>,
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
