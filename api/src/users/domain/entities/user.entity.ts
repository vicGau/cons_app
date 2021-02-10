import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Companies, Booking } from '../../../booking/domain/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Companies, (company) => company.users)
  @JoinColumn()
  company: Companies;

  @OneToOne(() => Booking, (booking) => booking.user)
  booking: Booking;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
