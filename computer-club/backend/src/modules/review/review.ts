import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user';
import { Room } from '../room/entities/room';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Room, { cascade: true })
  @JoinColumn()
  room: Room;

  @ApiProperty()
  @Column()
  text: string;
}
