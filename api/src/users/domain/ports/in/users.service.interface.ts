import { UsersInputDto } from '../../../adapters/dtos/UsersInput.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities';

export interface IUsersService {
  readonly usersRepository: Repository<User>;

  create(user: UsersInputDto): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  findOne(options: object): Promise<User>;
  findAll(): Promise<User[]>;
  deleteUser(id: number): Promise<void>;
}
