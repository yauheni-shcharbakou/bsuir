import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  seenBy?: User[];

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ default: new Date() })
  date: Date;

  @ApiProperty()
  isNew?: boolean;
}
