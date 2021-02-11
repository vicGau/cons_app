import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards';
import { Rooms } from '../../domain/entities';
import { RoomService } from '../../interactors';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Rooms> {
    const room = await this.roomService.findOne({ where: { id } });
    return room;
  }

  @UseGuards(JwtAuthGuard)
  @Get('company/:id')
  async getAllByCompanyId(@Param('id') id: number): Promise<Rooms[]> {
    const rooms = await this.roomService.findAllByCompany(id);
    return rooms;
  }
}
