import { Rooms } from '../booking/domain/entities';

export const mockRoomInput: Rooms = {
  id: 1,
  name: 'Room name',
  available: true,
  company: null,
  booking: null,
};

export const mockRoomServiceFindOneParams = {
  where: { id: 1 },
};
