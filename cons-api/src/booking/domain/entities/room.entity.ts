import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Companies } from './company.entity';

@Entity('rooms')
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  available: boolean;

  @ManyToOne(() => Companies, (company) => company.rooms)
  @JoinColumn()
  company: Companies;

  @OneToMany(() => Booking, (booking) => booking.room)
  @JoinColumn()
  bookings: Booking[] | undefined;
}
