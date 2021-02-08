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
import * as moment from 'moment';

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

  @BeforeInsert()
  public async checkBooking() {
    const roomId = this.room.id;
    const userId = this.user.id;

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

    const newBookingStart = new Date(this.startDate).getTime();
    const newBookingEnd = new Date(this.endDate).getTime();

    const roomInfos = await getManager()
      .getRepository(Rooms)
      .findOne({
        relations: ['bookings'],
        where: { id: roomId },
      });

    if (roomInfos && roomInfos.bookings && roomInfos.bookings.length > 0) {
      const bookingClash = roomInfos.bookings
        .map((booking) => {
          const existingBookingStart = new Date(booking.startDate).getTime();
          const existingBookingEnd = new Date(booking.endDate).getTime();

          if (
            (newBookingStart >= existingBookingStart &&
              newBookingStart < existingBookingEnd) ||
            (existingBookingStart >= newBookingStart &&
              existingBookingStart < newBookingEnd)
          ) {
            throw new Error(
              `Booking could not be saved. There is a clash with an existing booking from ${moment(
                existingBookingStart,
              ).format('HH:mm')} to ${moment(existingBookingEnd).format(
                'HH:mm on LL',
              )}`,
            );
          }
          return false;
        })
        .every(Boolean);

      // Ensure the new booking is valid - the booking is for a future time)
      const validAppointment =
        newBookingStart < newBookingEnd &&
        newBookingStart > new Date().getTime();

      return !bookingClash && validAppointment;
    }

    return true;
  }
}
