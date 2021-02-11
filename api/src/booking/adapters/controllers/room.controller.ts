import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards';
import { Rooms } from '../../domain/entities';
import { RoomService } from '../../interactors';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /**
   * Endpoint to get information about one room
   * @param {number} id Room ID
   * @returns {Rooms} Room infos object
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Rooms> {
    const room = await this.roomService.findOne({ where: { id } });
    return room;
  }

  /**
   * Endpoint to get all rooms by company
   * @param {number} id Company ID
   * @returns {Rooms} Room infos object
   */
  @UseGuards(JwtAuthGuard)
  @Get('company/:id')
  async getAllByCompanyId(@Param('id') id: number): Promise<Rooms[]> {
    const rooms = await this.roomService.findAllByCompany(id);
    return rooms;
  }
}
