import { User } from '../../../users/domain/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rooms } from './room.entity';

@Entity('companies')
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (users) => users.company)
  users: User[];

  @OneToMany(() => Rooms, (rooms) => rooms.company)
  rooms: Rooms[];
}
