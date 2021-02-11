import { Controller, Get, Param } from '@nestjs/common';
import { Rooms } from '../../domain/entities';
import { RoomService } from '../../interactors';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<Rooms> {
    const room = await this.roomService.findOne({ where: { id } });
    return room;
  }

  @Get('company/:id')
  async getAllByCompanyId(@Param('id') id: number): Promise<Rooms[]> {
    const rooms = await this.roomService.findAllByCompany(id);
    return rooms;
  }
}