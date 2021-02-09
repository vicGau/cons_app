import { User } from 'src/users/domain/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  BeforeInsert,
  getManager,
} from 'typeorm';
import { Rooms } from './room.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @OneToOne(() => User, (user) => user.booking)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Rooms, (room) => room.bookings)
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

  private async checkBookingConflicts(newStartDate, newEndDate, roomId) {
    const roomInfos = await getManager()
      .getRepository(Rooms)
      .findOne({
        relations: ['bookings'],
        where: { id: roomId },
      });

    if (roomInfos && roomInfos.bookings && roomInfos.bookings.length > 0) {
      const conflicts = roomInfos.bookings
        .map((booking) => {
          const startDate = new Date(booking.startDate).getTime();
          const endDate = new Date(booking.endDate).getTime();

          if (
            (newStartDate >= startDate && newStartDate < endDate) ||
            (newStartDate <= startDate && startDate < newEndDate)
          ) {
            throw new Error('Room is unavailable during this period of time');
          }
          return false;
        })
        .every(Boolean);

      const isNewDateValid =
        newStartDate < newEndDate && newStartDate > new Date().getTime();

      return !conflicts && isNewDateValid;
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
    const newStartDate = new Date(this.startDate).getTime();
    const newEndDate = new Date(this.endDate).getTime();

    if (!(await this.checkBookingConflicts(newStartDate, newEndDate, roomId))) {
      return false;
    }
    return true;
  }
}
