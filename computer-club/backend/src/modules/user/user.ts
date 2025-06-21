import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: '' })
  phone: string;

  @ApiProperty()
  @Column({ default: '' })
  nickname: string;

  @ApiProperty({ type: String })
  @Column({ default: UserRole.CLIENT, type: String })
  role: UserRole;
}
