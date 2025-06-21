import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from '../option/option';
import { User } from '../user/user';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Option, { cascade: true })
  @JoinColumn()
  option: Option;

  @ApiProperty()
  @Column({ default: 0 })
  amount: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
