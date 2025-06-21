import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user';
import { Computer } from '../room/entities/computer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Computer, { cascade: true })
  @JoinColumn()
  computer: Computer;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column({ default: 1 })
  hours: number;
}
