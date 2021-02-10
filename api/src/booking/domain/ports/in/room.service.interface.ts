import { Repository } from 'typeorm';
import { Rooms } from '../../entities';

export interface IRoomService {
  readonly roomRepository: Repository<Rooms>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  findOne(options: object): Promise<Rooms>;
  findAllByCompany(id: number): Promise<Rooms[]>;
}
