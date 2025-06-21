import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComputerType } from '../../computer-type/computer-type';
import { Room } from './room';
import { Booking } from '../../booking/booking';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Computer {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => ComputerType, { cascade: true })
  @JoinColumn()
  type: ComputerType;

  @ManyToOne(() => Room, { cascade: true })
  @JoinColumn()
  room: Room;

  @ApiProperty()
  @OneToMany(() => Booking, (booking: Booking) => booking.computer)
  @JoinColumn()
  bookings: Booking[];

  @ApiProperty()
  @Column()
  code: number;
}
