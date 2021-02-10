import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Booking, (booking) => booking.room)
  booking: Booking;
}
