import { User } from '../../../users/domain/entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  BeforeInsert,
  getManager,
} from 'typeorm';
import { Rooms } from './room.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToOne(() => User, (user) => user.booking)
  @JoinColumn()
  user: User;

  @OneToOne(() => Rooms, (room) => room.booking)
  @JoinColumn()
  room: Rooms;

  private async isUserAuthorized(roomId, userId) {
    const room = await getManager()
      .getRepository(Rooms)
      .findOne({
        relations: ['company'],
        where: { id: roomId },
      });

    const user = await getManager()
      .getRepository(User)
      .findOne({
        relations: ['company'],
        where: { id: userId },
      });

    if (room.company.id !== user.company.id) {
      throw new Error('Booking could not be saved.');
    }
    return true;
  }

  @BeforeInsert()
  public async checkBooking() {
    const roomId = this.room.id;
    const userId = this.user.id;

    if (!(await this.isUserAuthorized(roomId, userId))) {
      return false;
    }
    return true;
  }
}
