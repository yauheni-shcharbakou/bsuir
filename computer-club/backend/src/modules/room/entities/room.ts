import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../../room-type/room-type';
import { Review } from '../../review/review';
import { Computer } from './computer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Room {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => RoomType, { cascade: true })
  @JoinColumn()
  type: RoomType;

  @ApiProperty()
  @OneToMany(() => Review, (review: Review) => review.room)
  @JoinColumn()
  reviews: Review[];

  @ApiProperty()
  @OneToMany(() => Computer, (computer: Computer) => computer.room)
  @JoinColumn()
  computers: Computer[];

  @ApiProperty()
  @Column({ unique: true })
  name: string;
}
